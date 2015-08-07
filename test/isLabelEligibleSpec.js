describe('isLabelEligible', function () {
  describe('approves of', function () {
    it('blocked', function () {
      expect(isLabelEligible('blocked')).toEqual(true);
    });

    it('needs design', function () {
      expect(isLabelEligible('needs design')).toEqual(true);
    });

    it('needs detail', function () {
      expect(isLabelEligible('needs detail')).toEqual(true);
    });

    it('needs-pm', function () {
      expect(isLabelEligible('needs-pm')).toEqual(true);
    });

    it('▩▩blocked▩▩', function () {
      expect(isLabelEligible('▩▩blocked▩▩')).toEqual(true);
    });

    it('▩▩ blocked ▩▩', function () {
      expect(isLabelEligible('▩▩ blocked ▩▩')).toEqual(true);
    });

    it('✖ needs backend story ✖', function () {
      expect(isLabelEligible('✖ needs backend story ✖')).toEqual(true);
    });

    it('-blocked-', function () {
      expect(isLabelEligible('-blocked-')).toEqual(true);
    });
  });

  describe('hates', function () {
    it('need supply', function () {
      expect(isLabelEligible('need supply')).toEqual(false);
    });
  });
});
