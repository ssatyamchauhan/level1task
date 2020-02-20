
module.exports = (mongoose) => {

    // structure of data 
    const dataSchema = new mongoose.Schema({

        name: {
            type: String
        },
        description: {
            type: String
        },
        website: {
            type: String
        },
        logo: {
            type: String
        },
        blog: {
            type: String
        }, 
        discord: {
            type: String
        }, 
        facebook: {
            type: String
        }, 
        github: {
            type: String
        }, 
        medium: {
            type: String
        }, 
        reddit: {
            type: String
        }, 
        telegram: {
            type: String
        }, 
        twitter: {
            type: String
        }, 
        youtube: {
            type: String
        },

    })

    return dataSchema;


}