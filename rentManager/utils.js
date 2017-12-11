

module.exports = {
  takeFirst: ary => (ary && Array.isArray(ary) && ary.length) ? ary[0] : null,
}