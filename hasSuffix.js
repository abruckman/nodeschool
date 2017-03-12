var fs = require('fs')

module.exports = function(directory, suffix, callback){
  fs.readdir(directory, function(err, data){
    if (err){
      callback(err)
    }else{
      var results = []
      data.forEach(function(file){
        if (hasSuffix(file, suffix)){
          results.push(file)
        }
      })
      callback(null, results)
    }
  })
}

function hasSuffix(string, suffix){
  suffix = "." + suffix
  suf_length = suffix.length
  endstring = string.slice(-suf_length)
  return endstring === suffix
}
