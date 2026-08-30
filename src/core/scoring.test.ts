import { describe, expect, it } from "vitest";
import { gradeAnswer, normalizeAnswer } from "./scoring";
import { inputQuestion, multipleQuestion, singleQuestion } from "../test/fixtures";

describe("gradeAnswer", () => {
  it("singleは唯一の選択肢だけを正解にする", () => { expect(gradeAnswer(singleQuestion, ["a"]).isCorrect).toBe(true); expect(gradeAnswer(singleQuestion, ["a", "b"]).isCorrect).toBe(false); expect(gradeAnswer(singleQuestion, []).isAnswered).toBe(false); });
  it("multipleは重複と順序を除いて完全一致させる", () => { expect(gradeAnswer(multipleQuestion, ["c", "a", "a"]).isCorrect).toBe(true); expect(gradeAnswer(multipleQuestion, ["a"]).isCorrect).toBe(false); expect(gradeAnswer(multipleQuestion, ["a", "b", "c"]).isCorrect).toBe(false); expect(gradeAnswer(multipleQuestion, []).isAnswered).toBe(false); });
  it("inputはNFC、改行、前後空白だけを正規化する", () => { expect(gradeAnswer(inputQuestion, ["  Cafe\u0301\r\n"]).isCorrect).toBe(true); expect(gradeAnswer(inputQuestion, ["café"]).isCorrect).toBe(false); expect(normalizeAnswer("input", [" a  b "])).toEqual(["a  b"]); expect(normalizeAnswer("input", ["Ａ"])).toEqual(["Ａ"]); expect(normalizeAnswer("input", ["  \u3000\n"])).toEqual([""]); expect(gradeAnswer(inputQuestion, ["  \u3000\n"]).isAnswered).toBe(false); });
});
