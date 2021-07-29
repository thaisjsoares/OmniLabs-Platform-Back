"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Groups = _interopRequireDefault(require("../../../../groups/infra/typeorm/entities/Groups"));

var _Lessons = _interopRequireDefault(require("./Lessons"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Lesson_History = (_dec = (0, _typeorm.Entity)('lesson_history'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.ManyToOne)(() => _Lessons.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'lesson_id'
}), _dec6 = Reflect.metadata("design:type", typeof _Lessons.default === "undefined" ? Object : _Lessons.default), _dec7 = (0, _typeorm.Column)(), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.ManyToOne)(() => _Groups.default), _dec10 = (0, _typeorm.JoinColumn)({
  name: 'group_id'
}), _dec11 = Reflect.metadata("design:type", typeof _Groups.default === "undefined" ? Object : _Groups.default), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)('decimal'), _dec17 = Reflect.metadata("design:type", Number), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.Column)('timestamp with time zone'), _dec23 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec24 = (0, _typeorm.Column)(), _dec25 = Reflect.metadata("design:type", String), _dec26 = (0, _typeorm.Column)(), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _typeorm.Column)(), _dec29 = Reflect.metadata("design:type", String), _dec30 = (0, _typeorm.CreateDateColumn)(), _dec31 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec32 = (0, _typeorm.UpdateDateColumn)(), _dec33 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class Lesson_History {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "lesson", _descriptor2, this);

    _initializerDefineProperty(this, "lesson_id", _descriptor3, this);

    _initializerDefineProperty(this, "group", _descriptor4, this);

    _initializerDefineProperty(this, "group_id", _descriptor5, this);

    _initializerDefineProperty(this, "title", _descriptor6, this);

    _initializerDefineProperty(this, "duration", _descriptor7, this);

    _initializerDefineProperty(this, "description", _descriptor8, this);

    _initializerDefineProperty(this, "resource", _descriptor9, this);

    _initializerDefineProperty(this, "released_at", _descriptor10, this);

    _initializerDefineProperty(this, "platform", _descriptor11, this);

    _initializerDefineProperty(this, "name", _descriptor12, this);

    _initializerDefineProperty(this, "link", _descriptor13, this);

    _initializerDefineProperty(this, "created_at", _descriptor14, this);

    _initializerDefineProperty(this, "updated_at", _descriptor15, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lesson", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lesson_id", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "group", [_dec9, _dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "group_id", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "resource", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "released_at", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "link", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = Lesson_History;
exports.default = _default;