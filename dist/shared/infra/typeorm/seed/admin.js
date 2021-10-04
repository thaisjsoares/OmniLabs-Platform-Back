"use strict";

var _uuid = require("uuid");

var _bcrypt = require("bcrypt");

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _.default)();
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)('admin', 8);
  await connection.query(`INSERT INTO ROLES(id, name, created_at, updated_at)
            values('acbdc058-fbe8-45b2-9b9e-9f65c35a6987','Admin', 'now()', 'now()' )
        `);
  await connection.query(`INSERT INTO USERS(id, name, email, password, created_at, updated_at)
            values('8e3b0d9d-925e-4be1-b440-e4ccb41f8657','admin', 'admin@omnilabs.com.br', '${password}', 'now()', 'now()' )
        `);
  await connection.query(`INSERT INTO users_roles(id, user_id, created_at, updated_at, role_id )
            values('${id}','8e3b0d9d-925e-4be1-b440-e4ccb41f8657', 'now()', 'now()', 'acbdc058-fbe8-45b2-9b9e-9f65c35a6987')
        `);
}

create().then(() => console.log('Admin has created'));