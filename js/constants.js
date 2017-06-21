const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

const ICON_CLASS_BASE = "fa";
const ICON_CLASS_PREFIX = "fa-";
const ICON_CLASS_PLAY = "fa-play";
const ICON_CLASS_PAUSE = "fa-pause";
const ACTIVE_CLASS = "active";
const ENCODING_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHUNK_SEPARATOR = ":";
const GROUP_SEPARATOR = "-";
const INITIAL_DIRECTION = Direction.RIGHT;
const INITIAL_STEP_INTERVAL = 200;
const GRID_WIDTH = 24;
const GRID_HEIGHT = 24;
