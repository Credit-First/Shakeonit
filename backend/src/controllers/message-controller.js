
var Message = require('../models/messages');
var Accept = require('../models/accepts');

exports.insert = async function(from_addr, to_addr, collection_id, content) {
    var data = new Message({
        from_addr, to_addr, collection_id, content
    });

    try {
        await data.save();

        const accepted = await Accept.findOne({ from_addr: from_addr }).find({ to_addr: to_addr }).find({ collection_id: collection_id });
        if(accepted === null || accepted === undefined || accepted === "" || !accepted || accepted.length === 0){
            const newAcceptStatus = {
                from_addr: from_addr,
                to_addr: to_addr,
                collection_id: collection_id,
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
    } catch (err) {
        console.log(err);
    }
}

exports.getAllChattingHistories = async function(req, res) {
    const from_addr = req.params.from_addr;
    const to_addr = req.params.to_addr;
    const collection_id = req.params.collection_id;
    const chats = await Message.find({ from_addr: from_addr }).find({ to_addr: to_addr }).find({ collection_id: collection_id });

    return res.status(200).json(chats);
}

exports.getAcceptStatus = async (req, res) => {
    const from_addr = req.params.from_addr;
    const to_addr = req.params.to_addr;
    const collection_id = req.params.collection_id;
    const accepts = await Accept.findOne({ from_addr: from_addr }).find({ to_addr: to_addr }).find({ collection_id: collection_id });
    if(accepts[0]){
        return res.status(200).json(accepts[0]);
    }else{
        return false;
    }

}

exports.setAcceptStatusAllow = async (req, res) => {
    const from_addr = req.params.from_addr;
    const to_addr = req.params.to_addr;
    const collection_id = req.params.collection_id;

    const filter = { from_addr: from_addr, to_addr: to_addr, collection_id: collection_id };
    const update = { flag: true };
    console.log("success");
    // `doc` is the document _before_ `update` was applied
    let doc = await Accept.findOneAndUpdate(filter, update);

    return res.status(200).json(doc);
}

exports.getContacts = async (req, res) => {
    const address = req.params.address;
    if(!address) return res.status(200).json({ message: 'Invaild user address' });

    const _data = await Message.aggregate([
        {"$match": { from_addr: address } },
        {"$group": { "_id": {to_addr: "$to_addr", collection_id: "$collection_id" } } }
    ]);
    let data = [];
    for (const a_data of _data) {
        data.push(a_data["_id"]);
    }
    
    return res.status(200).json(data);
}

exports.getChats = async (req, res) => {
    const from_addr = req.params.from_addr;
    const to_addr = req.params.to_addr;
    const collection_id = req.params.collection_id;
    if(!from_addr || !to_addr || !collection_id) return res.status(200).json({ message: 'Invaild  address' });

    const data = await Message.find({from_addr, to_addr, collection_id}, {from_addr: 1, to_addr: 1, content: 1, _id: 0});
        
    return res.status(200).json(data);
}