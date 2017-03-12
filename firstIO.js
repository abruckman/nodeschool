var fs = require('fs')
var hasSuffix = require('./hasSuffix.js')

function hasSuffix(string, suffix){
  suffix = "." + suffix
  suf_length = suffix.length
  endstring = string.slice(-suf_length)
  return endstring === suffix
}
//
// word = "dangerous.mlt"
// other_word = "satdatats"
// suffix ="mlt"
// console.log(hasSuffix(word, suffix))
// console.log(hasSuffix(other_word, suffix))
// console.log(word)
//
var buf = fs.readdir(process.argv[2], function(err, data){
  if (err){
    console.log(err)
  }else{
    console.log(results.join("\n"))
  }
})
