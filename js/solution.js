(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    const NOT_EXPLORED = -1;

    /**
     * Создает генератор для карты по его схеме.
     *
     * @param {number[][]} map карта островов
     * @returns {number} кол-во островов
     */
    const exploreMap = function*(map) {
        if (!Array.isArray(map)) throw new Error("The argument must be an array");
        if (!map.every(e => Array.isArray(e))) throw new Error("Every element of the array must be an array");

        let exploredMap = [];
        exploredMap.M = map.length;
        exploredMap.N = map[0].length;
        exploredMap.islandCount = 0;

        for(let i = 0; i < exploredMap.M; i++) exploredMap[i] = Array(exploredMap.N).fill(NOT_EXPLORED);

        for(let i = 0; i < exploredMap.M; i++) {
            for(let j = 0; j < exploredMap.N; j++) {
                if (exploredMap[i][j] === NOT_EXPLORED) yield* checkCell(map, exploredMap, i, j, map[i][j] === ISLAND);
            }
        }

        return exploredMap.islandCount;
    };

    /**
     * Создает генератор для открытия очередной ячейки карты.
     * Если данная ячейка окажется островом, тогда продолжится поиск для
     * ее соседних ячеек по горизонтали и вертикали
     *
     * @param {number[][]} map карта островов
     * @param {number[][]} exploredMap вспомогательная карта, хранит значения: еще не открыта(-1), вода, номер острова)
     * @param {number} i координата клетки по вертикали
     * @param {number} j координата клетки по горизонтали
     * @param {boolean} newIsland признак начала полного поиска острова
     * @returns {number} кол-во островов
     */
    const checkCell = function*(map, exploredMap, i, j, newIsland){
        if (i >= exploredMap.M || i < 0 || j >= exploredMap.N || j < 0 || exploredMap[i][j] !== NOT_EXPLORED) {
            return;
        }

        if (map[i][j] === WATER) {
            exploredMap[i][j] = WATER;
            yield { i, j, map: Object.assign({}, exploredMap) };
        }
        else {
            if (newIsland) {
                exploredMap.islandCount++;
                newIsland = false;
            }
            exploredMap[i][j] = ISLAND;
            // не просто признак острова, но и принадлежность к группе островов
            //exploredMap[i][j] = newIsland ? ++exploredMap.islandCount : exploredMap.islandCount;
            yield { i, j, map: Object.assign({}, exploredMap) };

            yield* checkCell(map, exploredMap, i - 1, j, newIsland);
            yield* checkCell(map, exploredMap, i, j + 1, newIsland);
            yield* checkCell(map, exploredMap, i + 1, j, newIsland);
            yield* checkCell(map, exploredMap, i, j - 1, newIsland);
        }
    };

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
            console.log(done, value);
            if (done) return value;
        }
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);