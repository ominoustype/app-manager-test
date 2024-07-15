/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import { DynamoDBStreamEvent, DynamoDBRecord, AttributeValue } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue as DynamoDbAttributeValue } from '@aws-sdk/client-dynamodb';

export default abstract class DynamodbStreamDeserializer {
    protected abstract getSerializedData(record: DynamoDBRecord): Record<string, AttributeValue> | undefined;

    protected deserialize(attributes: Record<string, AttributeValue>): Record<string, any> {
        return unmarshall(attributes as Record<string, DynamoDbAttributeValue>);
    }

    run(event: DynamoDBStreamEvent) {
        return event.Records.reduce((acc: any, record: any) => {
            // eslint-disable-next-line one-var
            const dataToDeserialize = this.getSerializedData(record) ?? {},
                data = this.deserialize(dataToDeserialize);

            acc.push(data);

            return acc;
        }, [] as Array<Record<string, any>>);
    }
}
