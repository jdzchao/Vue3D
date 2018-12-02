export function getFileName(filepath) {
    if (filepath !== "") {
        let names = filepath.split("\\");
        names = names[names.length - 1];
        names = names.split("/");
        return names[names.length - 1];
    }
};

export function getFileNameWithoutExt(filepath) {
    if (filepath !== "") {
        let name = getFileName(filepath);
        name = name.split('.');
        return name[0];
    }
};

export function getFileExtName(filepath) {
    if (filepath !== "") {
        let name = getFileName(filepath);
        name = name.split('.');
        return name[name.length - 1];
    }
};

