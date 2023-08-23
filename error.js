
// what if error tookplace outside express in node
setTimeout(() => {
    throw new Error('oops')
}, 300)

// process object is about the current process you are in

process.on('uncaughtException', () => {

})

process.on('unhandledRejection', ()=> {
    
})