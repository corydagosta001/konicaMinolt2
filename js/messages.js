class messages
{
        sendMsg_firstMove(n,h,m,msg)
        {
            app.ports.response.send(
            {
                "msg": msg,
                "body":
                {
                    "newLine": n,
                    "heading": h,
                    "message": m
                }
            })
        }

        sendMsg_secondMove(sx,sy,ex,ey,heading,msg,message)
        {
            app.ports.response.send(
 {
    "msg": msg,
    "body": {
        "newLine": {
            "start": {
                "x": sx,
                "y": sy
            },
            "end": {
                "x": ex,
                "y": ey
            }
        },
        "heading": heading,
        "message": message
    }
}
            )

        }
}


























