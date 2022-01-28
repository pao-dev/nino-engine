class Input {
    constructor() { }
    static init(canvas) {
        // keys
        ["keydown", "keyup"].forEach((eventName) => {
            window.addEventListener(eventName, (event) => {
                Input.eventHandler(event);
            });
        });
        // mouse
        ["mousedown", "mouseup"].forEach((eventName) => {
            window.addEventListener(eventName, (event) => {
                Input.eventHandlerMouse(event);
            });
        });
        // Mouse move
        document.addEventListener("mousemove", (event) => {
            var cRect = canvas.getBoundingClientRect();
            Input.mouseX = Math.round(event.clientX - cRect.left);
            Input.mouseY = Math.round(event.clientY - cRect.top);
        });
    }
    static getButtonPress(key) {
        if (Input.keyMap.get(key) && !Input.pressed.get(key)) {
            Input.pressed.set(key, true);
            return true;
        }
        else
            return false;
    }
    static getButton(key) {
        return Input.keyMap.get(key);
    }
    static eventHandler(event) {
        // Evitar funcionamiento por defecto
        event.preventDefault();
        const input = {
            key: event.key,
            state: event.type === "keydown" ? 1 : 0
        };
        // Si el estado es igual al estado
        if (Input.keyMap.get(input.key) === input.state) {
            return;
        }
        // Asigar estado de teclas presionadas
        if (!input.state) {
            Input.pressed.set(input.key, false);
        }
        // Asignar los valores
        Input.keyMap.set(input.key, input.state);
    }
    // ? mouse
    static getClickPress(key) {
        if (Input.mouseMap.get(key) && !Input.mousePressed.get(key)) {
            Input.mousePressed.set(key, true);
            return true;
        }
        else
            return false;
    }
    static eventHandlerMouse(event) {
        // Evitar funcionamiento por defecto
        event.preventDefault();
        const input = {
            key: "b",
            state: event.type === "mousedown" ? 1 : 0
        };
        // Si el estado es igual al estado
        if (Input.mouseMap.get(input.key) === input.state) {
            return;
        }
        // // Asigar estado de teclas presionadas
        if (!input.state) {
            Input.mousePressed.set(input.key, false);
        }
        // Asignar los valores
        Input.mouseMap.set(input.key, input.state);
    }
    static hover(position, size) {
        return (position.x < Input.mouseX &&
            position.x + size > Input.mouseX &&
            position.y < Input.mouseY &&
            position.y + size > Input.mouseY);
    }
}
Input.mouseX = 0;
Input.mouseY = 0;
Input.onclick = false;
Input.keyMap = new Map();
Input.pressed = new Map();
Input.mouseMap = new Map();
Input.mousePressed = new Map();
export default Input;
