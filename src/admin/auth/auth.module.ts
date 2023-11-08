import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminSchema } from '../../schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Admin',
        useFactory: () => {
          const schema = AdminSchema;
          schema.pre('save', async function () {
            if (this.password) {
              const salt = await bcrypt.genSalt(10);
              const hashPassword = await bcrypt.hash(this.password, salt);
              this.password = hashPassword;
            }
          });
          return schema;
        },
      },
    ]), // Setup the mongoose module to use the admin schema,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ADMIN_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRY_TIME },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
