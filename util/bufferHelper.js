/**
 * 一个字节流操作
 */

var BufferHelper = function () {
    var buffers = [];
    var size = 0;
    Object.defineProperty(this, 'length', {   //修改buffers的length属性，使其返回size;
        get:function () {
            return this.size;
        }
    });
}
/**
 * 重置buffers
 */
BufferHelper.prototype.empty = function () {
    this.buffers = [];
    this.size = 0;
    return this;
}

/**
 * 添加字节流
 */
BufferHelper.prototype.concat = function (buffer) {
    this.buffers.push(buffer);
    this.size += buffer.length;
    return this;
}

/**
 * 转换成Buffer
 */
BufferHelper.prototype.toBuffer = function () {
    return Buffer.concat(this.buffers, this.size);
}

/**
 * 转换成字符串
 */
BufferHelper.prototype.toString = function (encoding) {
    return this.toBuffer().toString(encoding);
}

BufferHelper.prototype.load = function (stream, callback) {
    var that = this;
    stream.on('data', function (trunk) {
        that.concat(trunk);
    });
    stream.on('end', function () {
        callback(null, that.toBuffer());
    });
    stream.once('error', callback);
}

module.exports = BufferHelper;