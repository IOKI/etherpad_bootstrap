#etherpad_bootstrap

##requires

1. pm2
2. nodejs
3. grunt-cli


##howto

0. sh bootstrap.sh - do all the things
1. grunt [default task] - gets content from repositories and starts the app
2. grunt start - start
3. grunt stop - stop
4. grunt kill - stop & delete from pm2 daemon
5. grunt reload - 0 down-time reload of app
