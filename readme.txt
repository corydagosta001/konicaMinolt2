The game uses pubsub to send messages to and from the server.
- Setup
---------------------------------------------------------------------------------------------------------------------------------------------------------------
 Root level
     index.html
     readme.txt
     js [folder]
         gameIntel.js
         gameServer.js
         init.js
         main.js
         messages.js
         ui.js
     css [folder]
         style.css  

- Overview
--------------------------------------------------------------------------------------------------------------------------------------------------------------
The gamesserver.js file contains the code that recieves requests and sends them to the gameIntel object to verify if moves are valid.
The gameIntel.js contains the gameIntel class. The messages object collects output parameters from the gameIntel object and then sends
the response message back to the client. The messages class is contained in the messages.js file. 
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*Note - I realized that instead of looping through the grid arrays i could've just pointed straight to the elements using y * 4 + x
        I was more than halfway finished so instead I continued with looping through the arrays.

- Description
--------------------------------------------------------------------------------------------------------------------------------------------------------------  
  The gameIntel class contains all the logic for determining if a move is valid or if the game has ended. The gameIntel class is instantaited 
  in the gamesServer file and is called gi. When coordinates are sent from the client the parameters are passed to the setPointsXY method in gi.
  The first move is not checked as valid. The end click coordinates are sent to the method checkForValidMove(). If the move isn't valid it will set
  the error message property and all other properties to be collected by the messages object. The messages object send the response back to the client
  and an "invalid move" message will appear. If the start click and end click are valid all arrays keeping track of movement are updated along with the phase
  variable that keeps track of player's turn. All parameters are then sent to the messages object which sends the response to the client. Before the next start
  click the checkEndOfGame() method is called. the checkEndOfGame method first loops through the arrGrid1 array and looks for possible nodes near the end point
  nodes. It then determines if they are occupied. If not, the game will continue. If all near by nodes are occupied then the checkLastMoveDiag() method is called.
  It checks the availability of all nearest diagonal nodes. If any are available it then checks if a line is connected in between. If not the move is available.
  if all nodes including diagonal are occupied or have lines between then the end game parameter is sent to the messages object and the game ends.




   

