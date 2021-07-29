"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Roles = _interopRequireDefault(require("../../../../roles/infra/typeorm/entities/Roles"));

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("./User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let UserRole = (_dec = (0, _typeorm.Entity)('users_roles'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.OneToOne)(() => _User.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec6 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec7 = (0, _typeorm.Column)(), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.CreateDateColumn)(), _dec10 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec11 = (0, _typeorm.UpdateDateColumn)(), _dec12 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec13 = (0, _typeorm.ManyToOne)(() => _Roles.default), _dec14 = (0, _typeorm.JoinColumn)({
  name: 'role_id'
}), _dec15 = Reflect.metadata("design:type", typeof _Roles.default === "undefined" ? Object : _Roles.default), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = class UserRole {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "user", _descriptor2, this);

    _initializerDefineProperty(this, "user_id", _descriptor3, this);

    _initializerDefineProperty(this, "created_at", _descriptor4, this);

    _initializerDefineProperty(this, "updated_at", _descriptor5, this);

    _initializerDefineProperty(this, "roles", _descriptor6, this);

    _initializerDefineProperty(this, "role_id", _descriptor7, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "roles", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "role_id", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = UserRole;
exports.default = _default;