
var Message = require('../models/messages');
var Accept = require('../models/accepts');

exports.insert = async function(from_addr, to_addr, token_id, content, role) {
    var data = new Message({
        from_addr, to_addr, token_id, content
    });

    try {
        await data.save();

        if(role == "buyer"){
            const accepted = await Accept.find({ contract_address: to_addr }).find({ token_id: token_id });
            if(accepted === null || accepted === undefined || accepted === "" || !accepted || accepted.length === 0){
                const newAcceptStatus = {
                    contract_address: to_addr,
                    token_id: token_id,
                    flag: false
                };
        
                const newAcceptModel = new Accept(newAcceptStatus);
    
                newAcceptModel.save((error) =>{
                if(error){
                    console.log('error: '+error)
                } else{
                    console.log('Saved acceptmodel !!!')
                    }
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

exports.getAllChattingHistories = async function(req, res) {
    const from_addr = req.params.from_addr;
    const to_addr = req.params.to_addr;
    const token_id = req.params.token_id;
    const chats = await Message.find({ from_addr: from_addr }).find({ to_addr: to_addr }).find({ token_id: token_id });

    return res.status(200).json(chats);
}

exports.getAcceptStatus = (req, res) => {
    return new Promise((resolve, reject)=>{
        const contract_address = req.params.contract_address;
        // const token_id = req.params.token_id;
        Accept.findOne({ contract_address })
            .then(data=>{
                resolve(res.status(200).json(data))
            })
            .catch(reject)
    })
}

exports.getAllRequests = async (req, res) => {
    const contract_address = req.params.contract_address;
    const all_requests = await Accept.aggregate([
        {$match: {contract_address: contract_address, flag: false}},   // you can give any condition here.
        {
          $lookup:
            {
              from: "messages",
              localField: "messages_id",
              foreignField: "_id",
              as: "messages_id"
            }
       }
    ]);

    if(all_requests){
        return res.status(200).json({length: all_requests.length});
    }else{
        return res.status(200).json({length: 0});
    }
}

exports.setAcceptStatusAllow = async (req, res) => {
    const contract_address = req.params.contract_address;
    const token_id = req.params.token_id;

    const filter = { contract_address: contract_address, token_id: token_id };
    const update = { flag: true };
    // `doc` is the document _before_ `update` was applied
    let doc = await Accept.findOneAndUpdate(filter, update);
    console.log("success");

    return res.status(200).json(doc);
}

exports.getContacts = async (req, res) => {
    const address = req.params.address;
    if(!address) return res.status(200).json({ message: 'Invaild user address' });

    const _data = await Message.aggregate([
        {"$match": { from_addr: address } },
        {"$group": { "_id": {to_addr: "$to_addr", token_id: "$token_id" } } }
    ]);
    let data = [];
    for (const a_data of _data) {
        data.push(a_data["_id"]);
    }
    
    return res.status(200).json(data);
}

exports.getLastMessage = async (req, res) => {
    const _data = await Message.aggregate([
        {"$sort": { "_id": 1 }},
        {"$group": { "_id": "$to_addr", content: {$last: "$content"} } },
    ]);
    return res.status(200).json(_data);
}

// exports.getChats = async (req, res) => {
//     const from_addr = req.params.from_addr;
//     const to_addr = req.params.to_addr;
//     const token_id = req.params.token_id;
//     if(!from_addr || !to_addr || !token_id) return res.status(200).json({ message: 'Invaild  address' });

//     const data = await Message.find({from_addr, to_addr, token_id}, {from_addr: 1, to_addr: 1, content: 1, _id: 0});
        
//     return res.status(200).json(data);
// }

exports.getChats = async (req, res) => {
    return new Promise((resolve, reject)=>{
        const to_addr = req.params.to_addr;
        if(!to_addr) resolve(res.status(200).json({ message: 'Invaild  address' }))
        
        Message.find({to_addr}, {from_addr: 1, to_addr: 1, content: 1})
            .then(data=>{
                resolve(res.status(200).json(data))
            })
            .catch(reject)
    })
}

exports.getContactAddresses = (req, res) => {
    return new Promise((resolve, reject)=>{
        Accept.find({}, {contract_address: 1}).sort("contract_address").exec((err, docs)=>{
            if(!err) {
                resolve(res.status(200).json(docs));
            }
            else
                reject(err)
        })
    })
}