    function getButtonRef(val: number) {
        if (val < 256) {
            return 'X';
        }
        if (val < 597) {
            return 'A';
        }
        if (val < 725) {
            return 'B';
        }
        if (val < 793) {
            return 'Y';
        }
        if (val < 836) {
            return '1';
        }
        if (val < 938) {
            return '2';
        }
        return '0';
    }
}
