import fs from "fs";

// Stop words
const stopWords = ["the", "is", "a", "an", "and", "or", "in", "on", "at", "of", "to", "for", "with", "as", "by", "my", "name"];

// load all names from json file
export function loadNames() {
  const data = fs.readFileSync(__dirname + "/names.json", "utf8")
  return JSON.parse(data)
}

function isChinese(char: string): boolean {
  return new RegExp(/\p{Script=Han}/u).test(char)
}

function splitName(name: string): string[] {
  let resultList: string[] = [];
  // Split the string by spaces/tabs
  const nameList = name.split(/\s+/)
  nameList.forEach((char) => {
    // Split Chinese by characters
    if (isChinese(char)) {
      resultList = resultList.concat(char.split(""))
    } else {
      resultList.push(char)
    }
  })
  return resultList
}

// Function to remove stop words from a string
function removeStopWords(input: string): string {
  const words = input.split(/\s+/);
  return words.filter(word => !stopWords.includes(word.toLowerCase())).join(" ");
}

export function searchName(names: string[], input: string): string {
  let result = ""

  // Preprocess the input to remove stop words and extract capitalized words
  const processedInput = removeStopWords(input)

  // Split input
  const inputCharList = splitName(processedInput)

  // Loop through names.json
  names.forEach((name) => {
    const nameList = splitName(name)
    if (inputCharList.every((item) => nameList.includes(item))) {
      result = name
    }
  })
  return result
}
