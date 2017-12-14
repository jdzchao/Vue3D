let GetFileName = function (filepath) {
  if (filepath !== "") {
    let names = filepath.split("\\");
    names = names[names.length - 1];
    names = names.split("/");
    return names[names.length - 1];
  }
};

let GetFileNameWithoutExt = function (filepath) {
  if (filepath !== "") {
    let name = GetFileName(filepath);
    name = name.split('.');
    return name[0];
  }
};

let GetFileExtName = function (filepath) {
  if (filepath !== "") {
    let name = GetFileName(filepath);
    name = name.split('.');
    return name[name.length - 1];
  }
};

export default {
  GetFileName: GetFileName,
  GetFileNameWithoutExt: GetFileNameWithoutExt,
  GetFileExtName: GetFileExtName
};
