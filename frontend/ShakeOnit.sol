pragma solidity ^0.8.8;

// SPDX-License-Identifier: BUSL-1.1
/*
Business Source License 1.1
License text copyright (c) 2017 MariaDB Corporation Ab, All Rights Reserved.
"Business Source License" is a trademark of MariaDB Corporation Ab.
-----------------------------------------------------------------------------
Parameters
Licensor:             ShakeOnIt DAO
Licensed Work:        ShakeOnIt Contracts
                      The Licensed Work is (c) 2022 ShakeOnIt DAO
Additional Use Grant: Any uses listed and defined at
                      shakeonit.eth
Change Date:          The earlier of 2025-04-01 or a date specified at
                      shakeonit.eth
Change License:       GNU General Public License v2.0 or later
-----------------------------------------------------------------------------
Terms
The Licensor hereby grants you the right to copy, modify, create derivative
works, redistribute, and make non-production use of the Licensed Work. The
Licensor may make an Additional Use Grant, above, permitting limited
production use.
Effective on the Change Date, or the fourth anniversary of the first publicly
available distribution of a specific version of the Licensed Work under this
License, whichever comes first, the Licensor hereby grants you rights under
the terms of the Change License, and the rights granted in the paragraph
above terminate.
If your use of the Licensed Work does not comply with the requirements
currently in effect as described in this License, you must purchase a
commercial license from the Licensor, its affiliated entities, or authorized
resellers, or you must refrain from using the Licensed Work.
All copies of the original and modified Licensed Work, and derivative works
of the Licensed Work, are subject to this License. This License applies
separately for each version of the Licensed Work and the Change Date may vary
for each version of the Licensed Work released by Licensor.
You must conspicuously display this License on each original or modified copy
of the Licensed Work. If you receive the Licensed Work in original or
modified form from a third party, the terms and conditions set forth in this
License apply to your use of that work.
Any use of the Licensed Work in violation of this License will automatically
terminate your rights under this License for the current and all other
versions of the Licensed Work.
This License does not grant you any right in any trademark or logo of
Licensor or its affiliates (provided that you may use a trademark or logo of
Licensor as expressly required by this License).
TO THE EXTENT PERMITTED BY APPLICABLE LAW, THE LICENSED WORK IS PROVIDED ON
AN "AS IS" BASIS. LICENSOR HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS,
EXPRESS OR IMPLIED, INCLUDING (WITHOUT LIMITATION) WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND
TITLE.
MariaDB hereby grants you permission to use this License’s text to license
your works, and to refer to it using the trademark "Business Source License",
as long as you comply with the Covenants of Licensor below.
-----------------------------------------------------------------------------
Covenants of Licensor
In consideration of the right to use this License’s text and the "Business
Source License" name and trademark, Licensor covenants to MariaDB, and to all
other recipients of the licensed work to be provided by Licensor:
1. To specify as the Change License the GPL Version 2.0 or any later version,
   or a license that is compatible with GPL Version 2.0 or a later version,
   where "compatible" means that software provided under the Change License can
   be included in a program with software provided under GPL Version 2.0 or a
   later version. Licensor may specify additional Change Licenses without
   limitation.
2. To either: (a) specify an additional grant of rights to use that does not
   impose any additional restriction on the right granted in this License, as
   the Additional Use Grant; or (b) insert the text "None".
3. To specify a Change Date.
4. Not to modify this License in any other way.
-----------------------------------------------------------------------------
Notice
The Business Source License (this document, or the "License") is not an Open
Source license. However, the Licensed Work will eventually be made available
under an Open Source License, as stated in this License.
*/

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

abstract contract TokenFactory {
    function create(uint contractType , string memory name, string memory symbol) virtual public returns(address);
} 

abstract contract Token is IERC721 {
    function mint(address _address, uint256 _amount) virtual public;
    function burn(address _address, uint256 _amount) virtual public;
    function setBaseURI(string memory _baseUri) virtual public;
}

interface IWETH {
    function withdraw(uint wad) external;
}

interface IRouter {

    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

}

interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}




/// @title ShakeOnIt Protocol
/// @author ShakeOnIt DAO
/// @notice You can make P2P swap of ERC20 and ERC721, transfer tokens safely
contract ShakeOnIt is Ownable, ReentrancyGuard, IERC721Receiver {

    using SafeERC20 for IERC20;


    /// *******************************************
    /// structs
    /// *******************************************

    // Could contain several nfts, and other fungible tokens
    struct Composite {
        address[] give;
        uint[] amountGiveOrTokenID;
        uint refNonce; //referance on previous order. In case when user create a cuouter offer. 
        bool temporary; // this field is used for case when this contract mint's the composite token for the user but holds it to skip approval
    }

    /// @notice Order sp2p swap
    struct Order {
        address give; // maker
        address get; // taker
        address owner; // order owner
        address buyer; // who can buy. if 0 address anyone can buy. if specific then only specific user can buy
        uint16 percentFee; // fee should be attached to the order
        uint amountGiveOrTokenID; // maker amount
        uint amountGetOrTokenID; // taker amount
        uint nonce; // always unique and incremental +1 (common) - created by contract
        uint created; // created or updated by cancelOrder
    }

    // *******************************************
    // structs with implementations (generic)
    // *******************************************

    struct ActiveOrderSet {
        Order[] list;
        uint nonce; // always increased
        mapping(uint => uint) nonceToIndex;
    }

    /// @notice Library function
    function getFromActiveOrderSet(uint nonce) public view returns (Order memory) {
        return orders.list[orders.nonceToIndex[nonce]];
    }

    /// @notice Library function
    function getActiveOrderLength() public view returns (uint) {
        return orders.list.length;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /// @notice Library function
    function addToActiveOrderSet(Order memory _item) private {
        // it becomes publicly visible for users and then they can execute the order
        orders.list.push(_item);
        orders.nonceToIndex[orders.nonce] = orders.list.length - 1;
        orders.nonce++;
    }

    /// @notice Library function
    function removeFromActiveOrderSet(uint nonce) private {
        uint index = orders.nonceToIndex[nonce];
        if (index == 0 || index >= orders.list.length) revert OutOfIndex();
        orders.list[index] = orders.list[orders.list.length - 1];
        delete orders.nonceToIndex[nonce];
        orders.list.pop();
    }


    /// *******************************************
    /// storage
    /// *******************************************


    
    /// @notice This list could be used the UI. without using of sabgraph node.
    ActiveOrderSet public orders;

    /// @notice for Composite 
    uint compositeNonce = 1;

    /// @notice the calc formula is amount * percent / 10000. So 10 means 0.1 percent for fungible tokens
    uint16 public percentFee = 10; // platform fee

    // static fee between non fungible tokens
    mapping(address => uint) staticFee;

    /// @notice how much admin earned (admin field)
    mapping(address => uint) public feeEarned;


    /// @notice how much contact owes to people
    mapping(address => uint) public debt;

    // compoiste nfts
    mapping(uint => Composite) composites;
    

    // *******************************************
    // events
    // *******************************************

    event PlaceOrder(address give, address get, uint amountGive, uint amountGet, uint nonce);
    
    event BuyOrder(uint nonce);
    
    event CancelOrder(uint nonce);

    /// *******************************************
    /// errors
    /// *******************************************

    error WrongOwner(address owner, address sender);
    
    error WrongAmount(uint requestedAmount, uint allowedAmount);
    
    error WrongChangedMsgValue(uint real, uint needed);
    
    error OrderIsEmpty();

    error MaximumFeeIs10Percent();

    error OutOfIndex();

    error CannotSentNativeToken();

    error OrderMustBeOlderThan1Week(uint diffSeconds);

    error NothingToExecute();

    error WrongToken(address requested, address actual);

    error UnsupportedToken(address token);

    mapping(address => uint8) supportedTokens;

    /// @notice Add supported tokens by admin
    /// @dev ShakeOnIt DAO
    /// @param _token Token Address
    /// @param _tokenType 0 when not supported, 1 when erc20, 2 when erc721
    function adjustSupportedToken(address _token, uint8 _tokenType) external onlyOwner {
        supportedTokens[_token] = _tokenType;
    }

    /// *******************************************
    /// Admin actions
    /// *******************************************

    Token public nft; 
    TokenFactory public factory;
    

    constructor(address _tokenFactory) {
        factory = TokenFactory(_tokenFactory);
        // Create NFT Contract from existing factory owned by this contract
        nft = Token(factory.create(1, "ShakeOnIt", "CNFT"));
        nft.setBaseURI(string(abi.encodePacked("0x",address(this), "/composites")));

        // swap fee
        staticFee[address(nft)] = 1 ether;
        Order memory _order;
        orders.list.push(_order);
        orders.nonce = 1; //start nonce
        supportedTokens[address(nft)] = 2;
        supportedTokens[address(0)] = 3;

        
    }
 
    /// @notice Change Fee (only owner can call)
    /// @dev ShakeOnIt DAO
    /// @param feeType Type of fee
    /// @param _token For fee type 1
    /// @param _value New fee. Must be less then 1000 (10 percent) in case of type 0, amount in case of 1
    function setFee(uint8 feeType, address _token, uint256 _value) external onlyOwner {
        if (feeType == 0) {
            if (_value >= 1000) revert MaximumFeeIs10Percent(); // maximum fee to save user's expectations
            percentFee = uint16(_value);
        } else {
            staticFee[_token] = _value;
        }
    }

    /// @notice We calculate huw much tokens we can fairly withdraw from the contract and withdraw (only owner can call)
    /// @dev ShakeOnIt DAO
    /// @param _token Specify withdrawable token
    function withdraw(address _token) external onlyOwner {
        if (isERC721(_token)) revert NothingToExecute();
        uint balance = _token == address(0) ? address(this).balance : IERC20(_token).balanceOf(address(this));
        uint withdrawable = balance - debt[_token];
        _sendAsset(_token, msg.sender, withdrawable);
    }

    /// @notice Cancel the order by the admin in case when order is too old (only owner can call)
    /// @dev ShakeOnIt DAO
    /// @param nonce Unique identifier of the order (always incremental)
    function cancelOrderByAdmin(uint nonce) external onlyOwner nonReentrant {
        
        Order memory order = getFromActiveOrderSet(nonce);
        
        if (order.owner == address(0x0)) revert NothingToExecute();
        if (order.created + 604800 > block.timestamp) revert OrderMustBeOlderThan1Week((order.created + 604800) - block.timestamp);
        
        _sendAsset(order.give, order.owner, order.amountGiveOrTokenID);
        _adjustDebt(order.give, true, order.amountGiveOrTokenID);
        _unwrapIfNeeded(msg.sender, order);
        removeFromActiveOrderSet(order.nonce);

        emit CancelOrder(nonce);
    }

    // *******************************************
    // common actions and getters
    // *******************************************


    /// @notice Check native token or not and perform the appropriate send
    /// @dev ShakeOnIt DAO
    /// @param _token Specify withdrawable token
    /// @param _recipient Target address
    /// @param _amount Target amount
    function _sendAsset(address _token, address _recipient, uint _amount) private {
        if (isERC721(_token)) {
            //IERC721(_token).approve(_recepient, _amount);
            IERC721(_token).safeTransferFrom(address(this), _recipient, _amount);
        } else if (_amount > 0) {
            if (_token == address(0x0)) {
                _safeTransfer(_recipient, _amount);
            }
            else {
                IERC20(_token).safeTransfer(_recipient, _amount);
            }
        }
    }

    /// @notice Calculate Fee based on order
    /// @dev ShakeOnIt DAO
    /// @param order Current order
    /// @param amount Trade Amount
    function getFee(address token, Order memory order, uint amount) private returns (uint) {
        return isERC721(token) ? 0 : (amount * order.percentFee / 10000);
    }

    function _unwrapIfNeeded(address msg_sender, Order memory order) private {
        if (order.give == address(nft) && composites[order.amountGiveOrTokenID].temporary == true) {
            // unwrap composite nft to real tokens
            _burn(msg_sender, order.amountGiveOrTokenID);
        }
    }

    /// @notice Cancel the order by the user. We can cancel partially (if too call trade_amountGive = 0) then timestamp should be updated only
    /// @dev ShakeOnIt DAO
    /// @param nonce Unique identifier of the order (always incremental)
    function cancelOrder(uint nonce) external nonReentrant {
        
        Order memory order = getFromActiveOrderSet(nonce);
        
        if (order.owner != msg.sender) revert WrongOwner(order.owner, msg.sender);

        
        _sendAsset(order.give, order.owner, order.amountGiveOrTokenID);
        _adjustDebt(order.give, true, order.amountGiveOrTokenID);

        _unwrapIfNeeded(msg.sender, order);

        removeFromActiveOrderSet(order.nonce);
        emit CancelOrder(nonce);

    }

    /// @notice Update the order by the user. We can cancel partially (if too call trade_amountGive = 0) then timestamp should be updated only
    /// @dev ShakeOnIt DAO
    /// @param nonce Unique identifier of the order (always incremental)
    /// @param newGet new token user wants get
    /// @param newAmountGet new token amount
    function updateOrder(uint nonce, address newGet, uint newAmountGet) external {
        
        Order memory order = getFromActiveOrderSet(nonce);
        
        if (order.owner != msg.sender) revert WrongOwner(order.owner, msg.sender);

        addToActiveOrderSet(Order(order.give, newGet, msg.sender, order.buyer, order.percentFee, order.amountGiveOrTokenID, newAmountGet, orders.nonce, block.timestamp));
        emit PlaceOrder(order.give, newGet, order.amountGiveOrTokenID, newAmountGet, orders.nonce - 1);
        
        removeFromActiveOrderSet(order.nonce);
        emit CancelOrder(nonce);
    }

    
    /// @notice Make a transfer and check real sent value diff
    /// @dev ShakeOnIt DAO
    /// @param token IERC20 token
    /// @param from Who spends token
    /// @param amountOrTokenID Transfer Amount 
    /// @return (diff, changed_msg_value)
    function _receiveAsset(uint changable_msg_value, address from , address token, uint amountOrTokenID) private returns (uint, uint) {
        address to = address(this);
        if (token == address(0)) {
            if (changable_msg_value < amountOrTokenID) revert WrongChangedMsgValue(changable_msg_value, amountOrTokenID);
            changable_msg_value -= amountOrTokenID;
            return (0, changable_msg_value);
        } else if (isERC721(token)) {
            
            // process specific case when this contract is owner of the contract but temporary to skip approval state
            if (token == address(nft) && nft.ownerOf(amountOrTokenID) == address(this) && composites[amountOrTokenID].temporary ) {
                //composites[amountOrTokenID].temporary = false; // remove the record
            } else
                IERC721(token).safeTransferFrom(from, to, amountOrTokenID);
            return (0, changable_msg_value);
        }
        else {
            uint balanceBefore = IERC20(token).balanceOf(address(this));
            IERC20(token).safeTransferFrom(from, to, amountOrTokenID);
            uint balanceAfter = IERC20(token).balanceOf(address(this));
            return (amountOrTokenID - (balanceAfter - balanceBefore), changable_msg_value);
        }
    }

    /// @notice Burn Composite NFT
    /// @dev ShakeOnIt DAO
    /// @param nonce NFT id
    function burn(uint nonce) external nonReentrant {
        _burn(msg.sender, nonce);
    }


    /// @notice Burn Composite NFT
    /// @dev ShakeOnIt DAO
    /// @param nonce NFT id
    function _burn(address msg_sender, uint nonce) private {
        
        Composite memory composite = composites[nonce];
        
        address owner = nft.ownerOf(nonce);

        if (msg_sender != owner && msg_sender != address(this)) revert WrongOwner(owner, msg_sender);
        
        uint length = composite.give.length;
        
        if (length == 0) revert NothingToExecute();

        for (uint i=0; i < length;) {
            
            _sendAsset(composite.give[i], owner, composite.amountGiveOrTokenID[i]);
            _adjustDebt(composite.give[i], true, composite.amountGiveOrTokenID[i]);
            unchecked {
                i++;
            }

        }

        nft.burn(owner, nonce);

        delete composites[nonce];

    }

    /// @notice Update contract's debt to the user
    /// @param token ERC20 or ERC721
    /// @param minus - Should we reduce debt? otherwise add to debt
    /// @param amountOrTokenId - How much to adjust or tokenID
    function _adjustDebt(address token, bool minus, uint amountOrTokenId) private {
        if (!isERC721(token))
            if (minus) {
                debt[token] -= amountOrTokenId;
            } else {
                debt[token] += amountOrTokenId;
            }
    } 

    /// @notice Mint Composite NFT
    /// @dev ShakeOnIt DAO
    /// @param tokens Token Addresses (fungible and non-fungible)
    /// @param amountOrTokenIds Amounts (fungible) of TokenIDs (non-fungible)
    function mint(address[] calldata tokens, uint[] memory amountOrTokenIds) external payable nonReentrant {
        uint changeable_msg_value = _mint(tokens, amountOrTokenIds, msg.value, msg.sender);
        _refundIfNeeded(msg.sender, changeable_msg_value);
    }

    /// @notice Mint Composite NFT
    /// @dev ShakeOnIt DAO
    /// @param tokens Token Addresses (fungible and non-fungible)
    /// @param amountOrTokenIds Amounts (fungible) of TokenIDs (non-fungible)
    /// @param receiver Holder of coins
    function _mint(address[] calldata tokens, uint[] memory amountOrTokenIds, uint changeable_msg_value, address receiver) private returns (uint) {
         
        uint length = tokens.length;

        for (uint i=0; i < length;) {
            
            (uint diff, uint change_msg_value2) = _receiveAsset(changeable_msg_value, receiver, tokens[i], amountOrTokenIds[i]);
            amountOrTokenIds[i] -= diff;
            changeable_msg_value = change_msg_value2;
            _adjustDebt(tokens[i], false, amountOrTokenIds[i]);
            //isTokenAllowed(tokens[i]);
            unchecked {
                i++;
            }
        }

        composites[compositeNonce] = Composite(tokens, amountOrTokenIds, 0, false);
    
        nft.mint(receiver, compositeNonce);
    
        compositeNonce++;

        return changeable_msg_value;
    }

    // @notice accept counter offer and cancel the previous order
    // @param nonce offer nonce (order)
    function acceptOffer(uint nonce) external payable nonReentrant {
        Order memory order = getFromActiveOrderSet(nonce);
        if (order.give != address(nft)) revert WrongToken(order.give, address(nft));

        uint refNonce = composites[order.amountGiveOrTokenID].refNonce;
        if (refNonce == 0) revert OutOfIndex();
        Order memory refOrder = getFromActiveOrderSet(refNonce);
        if (refOrder.owner != msg.sender) revert WrongOwner(refOrder.owner, msg.sender);
        //forget about previous order
        removeFromActiveOrderSet(refNonce);
        _buyOrder(msg.value, msg.sender, false, nonce);

    }

    /// @notice Make a counter offer and transfor the array of tokens into internal nft (if needed)
    /// @dev ShakeOnIt DAO
    /// @param refNonce Order ID
    /// @param gives Token Addresses (fungible and non-fungible)
    /// @param amountOrTokenIds Amounts (fungible) of TokenIDs (non-fungible)
    function makeOfferFromOrder(uint refNonce, address[] calldata gives, uint[] calldata amountOrTokenIds) external payable nonReentrant {
        Order memory order = getFromActiveOrderSet(refNonce);

        if (order.owner == address(0)) revert OutOfIndex();

        address give;

        uint amountOrTokenId;
        uint changable_msg_value;

        if (gives.length == 1) {
            give = gives[0];
            amountOrTokenId = amountOrTokenIds[0];
        }
        else {
            changable_msg_value = _mint(gives, amountOrTokenIds, msg.value, address(this));
            give = address(nft);
            composites[compositeNonce - 1].temporary = true;
            composites[compositeNonce - 1].refNonce = refNonce;
            amountOrTokenId = compositeNonce - 1;
        }
        
        _makeOrder(give, order.give, changable_msg_value, msg.sender, amountOrTokenId, order.amountGiveOrTokenID, order.owner);

    }

    /// @notice Make an new order
    /// @dev ShakeOnIt DAO
    /// @param give - token address or 0x address. if 0x address then it's native coin
    /// @param get - token address or 0x address. if 0x address then it's native coin
    /// @param amountGive - Maker amount
    /// @param amountGet - Taker Amount
    /// @param buyer - Who can buy. 0x0 address when anyone can buy
    function makeOrder(address give, address get, uint amountGive, uint amountGet, address buyer) external payable nonReentrant {
        _makeOrder(give, get, msg.value, msg.sender, amountGive, amountGet, buyer);
    } 

    /// @notice Make an new order
    /// @dev ShakeOnIt DAO
    /// @param give - token address or 0x address. if 0x address then it's native coin
    /// @param get - token address or 0x address. if 0x address then it's native coin
    /// @param msg_sender - who spends token
    /// @param amountGive - Maker amount
    /// @param amountGet - Taker Amount
    /// @param buyer - Who can buy. 0x0 address when anyone can buy
    function _makeOrder(address give, address get, uint msg_value, address msg_sender, uint amountGive, uint amountGet, address buyer) private {
        
        if (supportedTokens[give] == 0) revert UnsupportedToken(give);
        if (supportedTokens[get] == 0) revert UnsupportedToken(get);

        (uint diff, uint changeable_msg_value) = _receiveAsset(msg_value, msg_sender, give, amountGive);

        if (diff > 0) revert WrongAmount(amountGive, amountGive - diff);
    
        _refundIfNeeded(msg_sender, changeable_msg_value);

        _adjustDebt(give, false, amountGive);
        
        // it becomes publicly visible for users and then they can execute the order
        addToActiveOrderSet(Order(give, get, msg_sender, buyer, percentFee, amountGive, amountGet, orders.nonce, block.timestamp));

        emit PlaceOrder(give, get, amountGive, amountGet, orders.nonce - 1);
    }

    /// @notice Buy Order with any token. Only for case when give is nft, get is fungible
    /// @dev ShakeOnIt DAO
    /// @param nonce - unique nonce of the trade
    /// @param router - dex's router
    /// @param path Conversion Path
    function buyTokenWithSwap(uint256 nonce, IRouter router, address[] memory path, uint amount) external payable nonReentrant {
        
        (uint diff, uint changeable_msg_value) = _receiveAsset(msg.value, msg.sender, path[0], amount);
        amount -= diff;

        _refundIfNeeded(msg.sender, changeable_msg_value);

        Order memory order = getFromActiveOrderSet(nonce);

        //if (path[path.length -1] != order.get) revert WrongToken(order.get, path[path.length -1]);

        if (order.amountGetOrTokenID == 0) revert OrderIsEmpty();  
        
        if (order.buyer != address(0)) revert WrongOwner(order.buyer, msg.sender);

        uint amountGetFee =  getFee(order.get, order, order.amountGetOrTokenID);
        uint amountGiveFee =  getFee(order.give, order, order.amountGiveOrTokenID);

        if (path[0] == address(0x0)) {
            _safeTransfer(router.WETH(), amount);
            path[0] = router.WETH();
        }

        address sender = address(this);
        IERC20 tokenGive = IERC20(order.give == address(0x0) ? router.WETH() : order.give);
        IERC20 tokenGet = IERC20(order.give == address(0x0) ? router.WETH() : order.give);
        uint256 balanceBefore = tokenGet.balanceOf(sender);
        
        tokenGive.approve(address(router), amount);
        
        router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            order.amountGetOrTokenID,
            path,
            address(this),
            block.timestamp
        );
    
        uint256 balanceAfter = tokenGet.balanceOf(sender);
        
        
        if (balanceAfter <= balanceBefore) revert WrongAmount(balanceAfter, balanceBefore);
        
        uint bdiff = balanceAfter - balanceBefore;
        
        if (bdiff < order.amountGetOrTokenID) revert WrongAmount(diff, order.amountGetOrTokenID);

        if (order.get == address(0x0))
            IWETH(router.WETH()).withdraw(diff);

        //_buyOrder(0, false, nonce);

        uint amountGet = order.amountGetOrTokenID - amountGetFee;

        feeEarned[order.get] += bdiff - amountGet;
        feeEarned[order.give] += amountGiveFee;

        _sendAsset(order.get, order.owner, amountGet);
        _adjustDebt(order.get, true, amountGet);
        removeFromActiveOrderSet(order.nonce);

        emit BuyOrder(order.nonce);
        
    }

    function _refundIfNeeded(address msg_sender, uint msg_value) private {
        if (msg_value >0)
            _safeTransfer(msg_sender, msg_value);
    }

    // @notice Buy Few Orders at once. Anyone can execute this action
    /// @dev If at lesat one order is possible then transaction will be successful
    /// @param nonce  - Unique identifier of the order (always incremental)
    function buyOrder(uint nonce) external payable nonReentrant {
        _refundIfNeeded(msg.sender, _buyOrder(msg.value, msg.sender, true, nonce));
    }

    /// @notice Buy Few Orders at once. Anyone can execute this action
    /// @dev If at lesat one order is possible then transaction will be successful
    /// @param nonce - Array - Unique identifier of the order (always incremental)
    function buyOrders(uint[] calldata nonce) external payable nonReentrant {
        
        
        uint length = nonce.length;
        uint msg_value = msg.value;

        // even when some transactions front-runned then other are still executable
        uint skipped = 0;
        
        for (uint i=0; i < length;) {
            
            unchecked {
                i++;
            }

            if(orders.nonceToIndex[nonce[i - 1]] == 0) {
                
                unchecked {
                    skipped++;
                }
                
                continue;
            }
                
            msg_value = _buyOrder(msg_value, msg.sender, true, nonce[i - 1]);

        }

        //refund
        _refundIfNeeded(msg.sender, msg_value);

        if (skipped == length) revert NothingToExecute();
        
        
    }

    /// @notice Send from this smart contract to user
    /// @dev ShakeOnIt DAO
    /// @param receiver - Target address
    /// @param value - Target Amount
    function _safeTransfer(address receiver, uint value) private {
        (bool sent, ) = receiver.call { value: value }("");
        if (!sent) revert CannotSentNativeToken();
    }

    function isERC721(address token) public returns (bool) {
        
        if (token == address(nft))
            return true;
        return supportedTokens[token] == 2;
    }

    function getStaticFee(address token) public view returns (uint) {
        return staticFee[token] == 0 ? staticFee[address(0)] : staticFee[token];
    }

    /// @notice Internal buy order. Trust to valid changeable_msg_value
    /// @dev ShakeOnIt DAO
    /// @param changeable_msg_value - Mutable msg.value
    /// @param msg_sender - who spends token
    /// @param chargeGet Should we get tokens from the user or he put it before
    /// @param nonce - Unique identifier of the order (always incremental)
    function _buyOrder(uint changeable_msg_value, address msg_sender, bool chargeGet, uint nonce) private returns (uint) {
        
        Order memory order = getFromActiveOrderSet(nonce);

        if ( order.buyer != address(0) && order.buyer != msg_sender) revert WrongOwner(order.buyer, msg_sender);
        
        uint actualAmountGetFee =  getFee(order.get, order, order.amountGetOrTokenID);

        uint actualAmountGet = order.amountGetOrTokenID - actualAmountGetFee;

        // only when owner want to get some funds
        if (chargeGet) { 
        
            // balance before and after because we do not trust transfer function

            (uint diff, uint changeable_msg_value2) = _receiveAsset(changeable_msg_value, msg_sender, order.get, order.amountGetOrTokenID);
            
            //if (diff > 0 ) revert WrongAmount(order.amountGetOrTokenID, order.amountGetOrTokenID - diff);
            if (diff > 0 ) revert WrongAmount(order.amountGetOrTokenID, diff);
            changeable_msg_value = changeable_msg_value2;
            
        }

        // very important prevent case when NFT is removed
        if (order.owner  == address(0)) revert WrongOwner(order.owner, address(0));

        uint actualAmountGiveFee =  getFee(order.give, order, order.amountGiveOrTokenID);
        uint actualAmountGive = order.amountGiveOrTokenID - actualAmountGiveFee;

        _sendAsset(order.give, msg_sender, actualAmountGive);
        _adjustDebt(order.give, true, actualAmountGive);

        
        _unwrapIfNeeded(msg_sender, order);
        

        _sendAsset(order.get, order.owner, actualAmountGet);

    
        // pay static fee
        if (actualAmountGetFee + actualAmountGiveFee == 0) {

            uint fee = getStaticFee(order.get);

            if (changeable_msg_value < fee) revert WrongChangedMsgValue(changeable_msg_value, fee);
            changeable_msg_value -= fee;
            feeEarned[address(0)] += fee;
        } else {
            feeEarned[order.get] += actualAmountGetFee;
            feeEarned[order.give] += actualAmountGiveFee;
        }
       

        emit BuyOrder(order.nonce);

        removeFromActiveOrderSet(order.nonce);
       

        return changeable_msg_value;
        

    }

}