'use strict';

const { exec } = require('child_process');
const stream = require('stream');
const { wrap, kill } = require('../child-process');

describe('child-process', () => {
    describe('wrap', () => {
        it('should wrap child process', () => {
            const promise = wrap(exec('ls -l'));

            return expect(promise).resolves.toEqual(expect.any(String));
        });

        it('should reject on error', () => {
            const promise = wrap(exec('blah blah'));

            return expect(promise).rejects.toBeDefined();
        });

        it('should pipe to stdout', () => {
            const outStream = new stream.Writable();
            let log = '';
            outStream._write = data => {
                log += data.toString();
            };
            const promise = wrap(exec('ls -l'), {
                stdout: outStream,
                stderr: outStream
            });

            return expect(promise).resolves.toEqual(expect.any(String));
        });
    });

    describe('kill', () => {
        it('should kill child processes', () => {
            const childProcess = {
                kill: jest.fn(),
                on: jest.fn()
            };

            wrap(childProcess);
            wrap(childProcess);

            kill();
            expect(childProcess.kill).toHaveBeenCalledTimes(2);
        });
    });

    describe('kill', () => {
        it('should kill child processes', () => {
            const childProcess = {
                on: jest.fn(),
                kill: jest.fn()
            };

            wrap(childProcess);
            wrap(childProcess);

            kill();
            expect(childProcess.kill).toHaveBeenCalledTimes(2);
        });
    });
});
