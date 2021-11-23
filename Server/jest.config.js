module.exports = {
	roots: ["<rootDir>/src/"],
	testEnvironment: "node",
	preset: "ts-jest",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
}