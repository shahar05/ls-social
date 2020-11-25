import { EnvironmentCredentials } from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { config } from '../config';
const { accessKeyId,
    secretAccessKey,
    bucket,
    awsBasePath } = config.awsConfig;
// tslint:disable-next-line: object-literal-shorthand
const s3 = new S3({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
const ACL = 'public-read';
const Bucket = bucket;

export class AwsHelper {
    static readonly awsBasePath = awsBasePath;

    static saveFileToAws(Body: Buffer, Key: string) {
        const params: any = {
            Bucket,
            Key,
            Body,
            ACL
        };
        return s3.upload(params).promise();
    }

}
