supertest is a tools that allows us to do integration testing
jest is a testing framework just like express is server framework and react is client framework.

"npx ts-jest config:init" creates configuration file on our project for jest

unit testing is the testing of logic bits isolated from everything else like how does this function works. testing individual things in isolation is unit test. When we write code we need to make sure that it is testable. Everytime when you are writing code think about how can we test the code.
https://hendrixer.github.io/API-design-v4/
__tests__ is the default folder name jest looks for
"test suite" is basically a "describe" block when testing
In npm the "test" and "start" are only two commands that you dont have to put "run" before them

*****Deployment setup*****
Deployment or production is all about taking my files, taking them to the servers and paying them to run it.

when talking about "build" it is converting the "typescript" file into regular "js" file ahead of time and render on server side

"npm run build" will build and is on the dist folder 

make sure you .gitignore the dist