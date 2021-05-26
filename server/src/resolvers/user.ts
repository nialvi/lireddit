import agron2 from "argon2";
import { Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";

import { User } from "../entities/User";
import { MyContext } from "../types";

@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UserNamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await agron2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    await em.persistAndFlush(user);

    return user;
  }
}
