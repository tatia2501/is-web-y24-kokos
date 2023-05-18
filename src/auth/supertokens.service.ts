import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { AuthModuleConfig, ConfigInjectionToken } from './config.interface';
import UserRoles from 'supertokens-node/recipe/userroles';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Dashboard.init(),
        UserRoles.init(),
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'first_name',
              },
              {
                id: 'last_name',
              },
              {
                id: 'phone',
              },
              {
                id: 'email',
              },
              {
                id: 'password',
              },
              {
                id: 'login',
                validate: async (value) => {
                  if (value.length <= 16 && value.length >= 2) {
                    return undefined;
                  }
                  return 'Неверный размер логина';
                },
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  const roles = (await UserRoles.getAllRoles()).roles;
                  if (!roles.includes('manager')) {
                    await UserRoles.createNewRoleOrAddPermissions('manager', [
                      'write',
                      'read',
                    ]);
                  }

                  if (!roles.includes('customer')) {
                    await UserRoles.createNewRoleOrAddPermissions('customer', [
                      'read',
                    ]);
                  }

                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  if (response.status === 'OK') {
                    let role = null;
                    const formFields = input.formFields;

                    const email = input.formFields.find(
                      (field) => field.id === 'email',
                    ).value;
                    if (email.endsWith('@manager.com')) {
                      await UserRoles.addRoleToUser(
                        response.user.id,
                        'manager',
                      );
                      role = Role.Manager;
                    } else {
                      await UserRoles.addRoleToUser(
                        response.user.id,
                        'customer',
                      );
                      role = Role.Customer;
                    }

                    await prisma.user.create({
                      data: {
                        id: response.user.id,
                        first_name: formFields.find(
                          (field) => field.id === 'first_name',
                        ).value,
                        last_name: formFields.find(
                          (field) => field.id === 'last_name',
                        ).value,
                        email: formFields.find((field) => field.id === 'email')
                          .value,
                        phone: formFields.find((field) => field.id === 'phone')
                          .value,
                        login: formFields.find((field) => field.id === 'login')
                          .value,
                        role: role,
                      },
                    });
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init(),
      ],
    });
  }
}
