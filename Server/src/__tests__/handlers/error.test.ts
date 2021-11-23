import { ErrorCode, HandledError } from "../../error"

describe("Test error handler", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("Test error handler", () => {
        const message = "Napaka!"
        let error: HandledError | null = null
        try {
            throw new HandledError(ErrorCode.ExternalError, message)
        } catch (e) {
            error = e
        }

        expect(error?.code).toBe(ErrorCode.ExternalError)
        expect(error?.message).toBe(message)
    })
})
