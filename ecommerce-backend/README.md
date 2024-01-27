1.) `npm init`
2.) `npm i -g typescript` (install typescript globally)
3.) `tsc --init` (initialize typescript)
4.) `npm i express dotenv mongoose`
5.) `npm i --save-dev @types/express @types/node typescript` (THIS WILL GO AS DEV DEPENDENCIES IN PRODUCTION BCS IN PRODUCTION OUR FILES GOES IN .js EXTENSION, NOT IN .ts EXTENSION)

6.)`npm i --save-dev nodemon`
7.) `tsc` command to run typescript (like build)
8.) `node ./dist/app.js` run the project or start the server
9.)"watch":"tsc -w"  watch command when ever any change happen it will automatically create the build ,we don't have to create the build again n again
10.) command to run app.js file inside the dist continouly  `nodemon dist/app.js`
11.)DevDependencies=>only required during development, testing, or build processes.
12.) app.use(middleware)  always contains middleware as a parameter


1.) creating new project pushing in git hub command
a.) git init
b.) git add .
c.) git commit -m ""
d.) git remote-->check remote file added or not
e.) git remote add origin https://github.com/navsingh3211/mern_stack_ecommarce_backend.git
f.) git remote--> orgin named remote is added
g.) git remot -v --> to see link
h.) git push origin master
