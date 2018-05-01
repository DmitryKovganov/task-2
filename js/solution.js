(function (root) {
    const exploreMap = root.SHRI_ISLANDS.exploreMap;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        let explorator = exploreMap(map);

        while({ done, value } = explorator.next()) {
            if (done) return value;
        }
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);