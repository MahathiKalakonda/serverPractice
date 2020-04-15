const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');
const router = express.Router();

router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res) => {
    const isMemberFound = members.some(member => member.id === parseInt(req.params.id));
    if(isMemberFound)
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    else
        res.status(400).json({ msg: 'Member not found'});
});

router.post('/', (req, res) => {
    const newMember = {
        id: req.body.id || uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: req.body.status || 'active'
    };
    members.push(newMember);
    res.send(req.body);
});

router.put('/:id', (req, res) => {
    const isMemberFound = members.some(member => member.id === parseInt(req.params.id));
    if(isMemberFound)
    {
        const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id))
            {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
                res.json({ msg: 'Member updated', member});
            }
        });
    }
    else
        res.status(400).json({ msg: 'Member not found'});
});

router.delete('/:id', (req, res) => {
    const isMemberFound = members.some(member => member.id === parseInt(req.params.id));
    if(isMemberFound)
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    else
        res.status(400).json({ msg: 'Member not found'});
});

module.exports = router;