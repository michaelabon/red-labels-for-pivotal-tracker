describe('isLabelBlue', function () {
  describe('approves of', function () {
    it('planner', function () {
      expect(isLabelBlue('planner')).toEqual(true);
    });

    it('▩▩planner▩▩', function () {
      expect(isLabelBlue('▩▩planner▩▩')).toEqual(true);
    });

    it('▩▩ planner ▩▩', function () {
      expect(isLabelBlue('▩▩ planner ▩▩')).toEqual(true);
    });

    it('✖ planner ✖', function () {
      expect(isLabelBlue('✖ planner ✖')).toEqual(true);
    });

    it('-planner-', function () {
      expect(isLabelBlue('-planner-')).toEqual(true);
    });
  });

  describe('hates', function () {
    it('needs', function () {
      expect(isLabelBlue('needs')).toEqual(false);
    });
    
    it('blocked', function () {
      expect(isLabelBlue('blocked')).toEqual(false);
    });
    
    it('need', function () {
      expect(isLabelBlue('needs')).toEqual(false);
    });
  });
});
