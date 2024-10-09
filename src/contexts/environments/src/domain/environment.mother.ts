import DatetimeMother from '@context/shared/domain/datetime.mother';
import Environment, { EnvironmentPrimitives } from "./environment";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import EnvironmentNameMother from "./environmentName.mother";
import EnvironmentPathMother from "./environmentPath.mother";
import EnvironmentIdMother from "./environmentId.mother";
import CustomerMother from "./customer/customer.mother";
import CredentialsMother from "./credentials/credentials.mother";
import PrevDeploysMother from './prevDeploys/prevDeploys.mother';

export default class EnvironmentMother{
    static create(primitives: EnvironmentPrimitives): Environment {
        return new Environment(primitives);
    }

    static random(primitives?: Partial<EnvironmentPrimitives>): Environment {
        return EnvironmentMother.create({
            id: EnvironmentIdMother.random().value,
            name: EnvironmentNameMother.random().toString(),
            createdAt: DatetimeMother.random().toString(),
            rules: MotherCreator.words().split(' '),
            customer: CustomerMother.random().toPrimitives(),
            path: EnvironmentPathMother.random().toString(),
            credentials: CredentialsMother.random().toPrimitives(),
            prevDeploys: PrevDeploysMother.random().toPrimitives(),
            ...primitives
        })
    }

    static merge(oldEnvironment: Environment, newEnvironment: Environment) {
        return EnvironmentMother.create({
            ...oldEnvironment.merge(newEnvironment.toPrimitives())
        });
    }

    static randomList(): Environment[] {
        return Repeater.randomWithoutRepetitions(
            EnvironmentMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number): Environment[] {
        return Repeater.randomWithoutRepetitions(
            EnvironmentMother.random,
            size as number
        );
    }
}