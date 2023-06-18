const axios = require("axios")
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();

module.exports = async () => {
  let filter_data = []
  let filter_data_2 = []
  let final_data = []

  const res = await axios.get("https://raw.githubusercontent.com/DarrenOfficial/lavalink-list/master/docs/NoSSL/lavalink-without-ssl.md")
  var result = md.parse(res.data);

  result.filter(async data => {
    if (data.tag == "code") {
      filter_data.push(data.content)
    }
  })

  for (let i = 0; i < filter_data.length; i++) {
    const element = filter_data[i];
    // Phrase data
    const res = element.replace(/\n/g, "");
    const res2 = res.replace(/\s+/g, "")
    const res3 = res2.replace(/Host/g, "")
    const res4 = res3.replace(/Port/g, "")
    const res5 = res4.replace(/Password/g, "")
    const res6 = res5.replace(/Secure/g, "")
    const res7 = res6.replace(/[&\/\\#,+()$~%'"*?<>{}]/g, "")
    filter_data_2.push(res7)    
  }

  for (let i = 0; i < filter_data_2.length; i++) {
    const regex_extract = /:(.{0,99999}):([0-9]{0,99999}):(.{0,99999}):(false|true)/
    const element = filter_data_2[i];
    const res = regex_extract.exec(element)
    final_data.push({
      host: res[1],
      port: res[2],
      pass: res[3],
      secure: res[4] == "false" || res[4] == "False" ? false : true,
      online: false
    })
  }

  return final_data
} 