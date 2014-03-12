#etherpad_bootstrap

##requires

1. pm2 (sudo npm install pm2 -g)
2. nodejs
3. grunt-cli (sudo npm install grunt-cli -g)


##howto

0. sh bootstrap.sh - do all the things
1. grunt [default task] - gets content from repositories and starts the app
2. grunt start - start
3. grunt stop - stop
4. grunt kill - stop & delete from pm2 daemon
5. grunt reload - 0 down-time reload of app

##testing

1. app runs on port :8080
2. nmel test frame is located in the 'static' directory -> this should be available from a http server
