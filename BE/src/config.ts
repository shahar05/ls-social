export const config = {
    mongoConnection: 'mongodb://admin:admin1@ds141108.mlab.com:41108/social?retryWrites=false',
	awsConfig:{
		accessKeyId: "AKIAIKUZJKILP4KS4MIQ",
		secretAccessKey: "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",
		bucket: "socialimages2411",
		awsBasePath: 'https://socialimages2411.s3.us-east-2.amazonaws.com/'
	},
	jwtConfig:{
		secret: "this is my secret shhh...",
	}

}