describe('isLabelRed', function () {
  describe('approves of', function () {
    it('blocked', function () {
      expect(isLabelRed('blocked')).toEqual(true);
    });

    it('needs design', function () {
      expect(isLabelRed('needs design')).toEqual(true);
    });

    it('needs detail', function () {
      expect(isLabelRed('needs detail')).toEqual(true);
    });

    it('needs-pm', function () {
      expect(isLabelRed('needs-pm')).toEqual(true);
    });

    it('▩▩blocked▩▩', function () {
      expect(isLabelRed('▩▩blocked▩▩')).toEqual(true);
    });

    it('▩▩ blocked ▩▩', function () {
      expect(isLabelRed('▩▩ blocked ▩▩')).toEqual(true);
    });

    it('✖ needs backend story ✖', function () {
      expect(isLabelRed('✖ needs backend story ✖')).toEqual(true);
    });

    it('-blocked-', function () {
      expect(isLabelRed('-blocked-')).toEqual(true);
    });
  });

  describe('hates', function () {
    it('need supply', function () {
      expect(isLabelRed('need supply')).toEqual(false);
    });
  });
});
