const Data = require('../../database')().data;
const axios = require('axios')



exports.store = (req, res) => {

    // 
    
    function callingApi() {
        let listofdata = []
    axios
      .get("https://api.nomics.com/v1/currencies?key=f18f5cd0afd42cbfd6f6359510d62ebc&limit=10&offset=40")
      .then(data => {
        let listofdata = []
        for(var i of data.data){
          listofdata.push({
            name: i.name, 
            description: i.description, 
            website: i.website_url, 
            logo: i.logo_url,
            blog: i.blog_url,
            discord: i.discord_url,
            facebook: i.facebook_url,
            github: i.github_url,
            medium: i.medium_url,
            reddit: i.reddit_url,
            telegram: i.telegram_url,
            twitter: i.twitter_url,
            youtube: i.youtube_url
          })
        }
        Data.insertMany(listofdata, (err, data) => {
            if(err) return res.json({status:400})
            else{
                Data.find({}, null,{limit: 10}, (err,result) => {
                    if(err) console.log(err)
                    return res.json(result);
                });
            }
        })
        
      })
      .catch(err => {
        console.log(err)
      })
    }

    if(req.query.limit) {
        console.log('inside ')
        Data.find({}, null,{limit: 10, skip: req.query.limit-10}, (err,result) => {
            if(err) console.log(err)
            else{
                if(!result.length) {
                    return callingApi()
                }
                return res.json(result);
            }
        });
    }

    else{
    Data.find({}, null,{limit: 10}, (err,result) => {
        if(err) console.log(err)
        else{
            if(!result.length) {
                return callingApi()
            }
            return res.json(result);
        }
    });
}

    }