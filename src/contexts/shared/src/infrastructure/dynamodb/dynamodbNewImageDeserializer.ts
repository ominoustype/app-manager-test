/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import { AttributeValue, DynamoDBRecord } from 'aws-lambda';
import DynamodbStreamDeserializer from '@src/infrastructure/dynamodb/dynamodbStreamDeserializer';

export default class DynamodbNewImageDeserializer extends DynamodbStreamDeserializer {
    getSerializedData(record: DynamoDBRecord): Record<string, AttributeValue> | undefined {
        return record.dynamodb?.NewImage;
    }
}
