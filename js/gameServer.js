    var init = true;
    gi = new gameIntel(4,4);
    m = new messages();
    m.sendMsg_firstMove(null,"Player 1", "Awaiting Player 1's Move", "INITIALIZE");


    app.ports.request.subscribe((message) => {
    msg = JSON.parse(message);
    if(init == false)
    {
        gi.setPointsXY(msg.body.x,msg.body.y);
        if(parseInt(gi.phase) == 0)
        {
            m.sendMsg_firstMove(null,gi.playersMove, gi.message, gi.msg);
            gi.phaseTrack(false);
        } 
        else
            {
                m.sendMsg_secondMove(gi.start_node[0][0],gi.start_node[0][1],gi.end_node[0][0],gi.end_node[0][1],gi.playersMove,gi.mMsg,gi.EndNodeMessage);
                gi.phaseTrack(false);

                if(!gi.checkEndOfGame())
                {
                    m.sendMsg_secondMove(gi.start_node[0][0],gi.start_node[0][1],gi.end_node[0][0],gi.end_node[0][1],gi.playersMove,gi.mMsg,gi.EndNodeMessage); 
                }
            }
    } 
    init = false;
    
});