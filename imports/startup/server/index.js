import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const users = [
      { name: 'Normal User', email: 'normal@example.com', roles: [] },
      { name: 'View-Secrets User', email: 'view@example.com', roles: ['view-secrets'] },
      { name: 'Admin User', email: 'admin@example.com', roles: ['admin'] },
];

users.forEach(
  (user) => {
    if (!Accounts.findUserByEmail(user.email)) {
      const id = Accounts.createUser({
        email: user.email,
        password: 'apple1',
        profile: { name: user.name },
      });

      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles, 'default-group');
      }
    }
  });
