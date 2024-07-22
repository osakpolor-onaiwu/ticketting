module.exports ={
    webpack: (config) =>{
        config.watchOptions.poll = 3000;
        return config;
    }
}