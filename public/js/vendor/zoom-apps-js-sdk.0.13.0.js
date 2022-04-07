/*
  Copyright (c) 2021 Zoom Video Communications, Inc.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var zoomSdk = (function () {
    'use strict';

    var version = '0.13.0';

    /* Portions of this code are covered by the following license */
    /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
        extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function (d, b) {
                    d.__proto__ = b;
                }) ||
            function (d, b) {
                for (var p in b)
                    if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype =
            b === null
                ? Object.create(b)
                : ((__.prototype = b.prototype), new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    }

    function __generator(thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var NativeApis;
    (function (NativeApis) {
        NativeApis['CONFIG'] = 'config';
        NativeApis['SET_VIRTUAL_BACKGROUND'] = 'setVirtualBackground';
        NativeApis['REMOVE_VIRTUAL_BACKGROUND'] = 'removeVirtualBackground';
        NativeApis['SET_VIRTUAL_FOREGROUND'] = 'setVirtualForeground';
        NativeApis['REMOVE_VIRTUAL_FOREGROUND'] = 'removeVirtualForeground';
        NativeApis['GET_SUPPORTED_JS_APIS'] = 'getSupportedJsApis';
        NativeApis['GET_MEETING_CONTEXT'] = 'getMeetingContext';
        NativeApis['GET_RUNNING_CONTEXT'] = 'getRunningContext';
        NativeApis['OPEN_URL'] = 'openUrlInSysBrowser';
        NativeApis['SHOW_NOTIFICATION'] = 'showNotification';
        NativeApis['CLOUD_RECORDING'] = 'cloudRecording';
        NativeApis['SHARE_APP'] = 'shareApp';
        NativeApis['LIST_CAMERAS'] = 'listCameras';
        NativeApis['SET_CAMERA'] = 'setCamera';
        NativeApis['SET_VIDEO_MIRROR_EFFECT'] = 'setVideoMirrorEffect';
        NativeApis['GET_MEETING_PARTICIPANTS'] = 'getMeetingParticipants';
        NativeApis['SEND_APP_INVITATION'] = 'sendAppInvitation';
        NativeApis['GET_USER_CONTEXT'] = 'getUserContext';
        NativeApis['GET_RECORDING_CONTEXT'] = 'getRecordingContext';
        NativeApis['GET_MEETING_JOIN_URL'] = 'getMeetingJoinUrl';
        NativeApis['GET_MEETING_UUID'] = 'getMeetingUUID';
        NativeApis['EXPAND_APP'] = 'expandApp';
        NativeApis['CONNECT'] = 'connect';
        NativeApis['POST_MESSAGE'] = 'postMessage';
        NativeApis['ALLOW_PARTICIPANT_TO_RECORD'] = 'allowParticipantToRecord';
        NativeApis['LAUNCH_APP_IN_MEETING'] = 'launchAppInMeeting';
        NativeApis['SHOW_APP_INVITATION_DIALOG'] = 'showAppInvitationDialog';
        NativeApis['SEND_APP_INVITATION_TO_MEETING_OWNER'] =
            'sendAppInvitationToMeetingOwner';
        NativeApis['SEND_APP_INVITATION_TO_ALL_PARTICIPANTS'] =
            'sendAppInvitationToAllParticipants';
        NativeApis['END_SYNC_DATA'] = 'endSyncData';
        NativeApis['RUN_RENDERING_CONTEXT'] = 'runRenderingContext';
        NativeApis['CLOSE_RENDERING_CONTEXT'] = 'closeRenderingContext';
        NativeApis['DRAW_PARTICIPANT'] = 'drawParticipant';
        NativeApis['DRAW_IMAGE'] = 'drawImage';
        NativeApis['CLEAR_PARTICIPANT'] = 'clearParticipant';
        NativeApis['CLEAR_IMAGE'] = 'clearImage';
    })(NativeApis || (NativeApis = {}));
    var NativeEvents;
    (function (NativeEvents) {
        NativeEvents['ON_SHARE_APP'] = 'shareApp';
        NativeEvents['ON_SEND_APP_INVITATION'] = 'sendAppInvitation';
        NativeEvents['ON_CLOUD_RECORDING'] = 'onCloudRecording';
        NativeEvents['ON_REACTION'] = 'onReaction';
        NativeEvents['ON_PARTICIPANT_CHANGE'] = 'onParticipantChange';
        NativeEvents['ON_ACTIVE_SPEAKER_CHANGE'] = 'onActiveSpeakerChange';
        NativeEvents['ON_APP_POPOUT'] = 'onAppPopout';
        NativeEvents['ON_COHOST_CHANGE'] = 'onCohostChange';
        NativeEvents['ON_EXPAND_APP'] = 'onExpandApp';
        NativeEvents['ON_CONNECT'] = 'onConnect';
        NativeEvents['ON_MESSAGE'] = 'onMessage';
        NativeEvents['ON_MEETING'] = 'onMeeting';
        // ON_BREAKOUT_ROOM_CHANGE = 'onBreakoutRoomChange',
        NativeEvents['ON_MY_REACTION'] = 'onMyReaction';
        NativeEvents['ON_MY_ACTIVE_SPEAKER_CHANGE'] = 'onMyActiveSpeakerChange';
        NativeEvents['ON_MY_USER_CONTEXT_CHANGE'] = 'onMyUserContextChange';
        NativeEvents['ON_MY_MEDIA_CHANGE'] = 'onMyMediaChange';
    })(NativeEvents || (NativeEvents = {}));
    var Timeouts;
    (function (Timeouts) {
        Timeouts[(Timeouts['DEFAULT'] = 10000)] = 'DEFAULT';
        Timeouts[(Timeouts['SET_VIRTUAL_BACKGROUND'] = 120000)] =
            'SET_VIRTUAL_BACKGROUND';
    })(Timeouts || (Timeouts = {}));
    var nativeApiCallbacks = {};
    var nativeEventHandlers = {};
    var ZoomApiError = /** @class */ (function (_super) {
        __extends(ZoomApiError, _super);
        function ZoomApiError(m, code) {
            var _this = _super.call(this, m) || this;
            _this.code = code;
            Object.setPrototypeOf(_this, ZoomApiError.prototype);
            return _this;
        }
        return ZoomApiError;
    })(Error);
    var ZoomSdk = /** @class */ (function () {
        function ZoomSdk(options) {
            this._postMessage = options.postMessage;
            this.version = options.version;
        }
        ZoomSdk.prototype.native2js = function (message) {
            if (message.data.type === 'apiResponse') {
                var jsCallId = message.data.data.jsCallId;
                nativeApiCallbacks[jsCallId](message.data.data);
            } else if (message.data.type === 'event') {
                nativeEventHandlers[message.data.name] &&
                    nativeEventHandlers[message.data.name].forEach(function (
                        handler
                    ) {
                        return handler(message.data.data);
                    });
            }
        };
        ZoomSdk.prototype.callZoomApi = function (
            apiName,
            data,
            timeout,
            formatter
        ) {
            return __awaiter(this, void 0, void 0, function () {
                var jsCallId, nativeApiRequest;
                var _this = this;
                return __generator(this, function (_a) {
                    jsCallId = getJsCallId();
                    nativeApiRequest = {
                        jsCallId: jsCallId,
                        apiName: apiName,
                    };
                    if (data) nativeApiRequest.data = data;
                    return [
                        2 /*return*/,
                        new Promise(function (resolve, reject) {
                            var timer = setTimeout(function () {
                                var error = new Error(
                                    'The native client did not provide a response to the API call'
                                );
                                reject(error);
                                removeNativeApiCallback(jsCallId);
                            }, timeout || Timeouts.DEFAULT);
                            setNativeApiCallback(jsCallId, function (_a) {
                                var errorCode = _a.errorCode,
                                    errorMessage = _a.errorMessage,
                                    result = _a.result;
                                if (errorCode || errorMessage) {
                                    var error = new ZoomApiError(
                                        errorMessage,
                                        errorCode
                                    );
                                    reject(error);
                                } else {
                                    formatter
                                        ? resolve(formatter(result))
                                        : resolve(result);
                                }
                                removeNativeApiCallback(jsCallId);
                                clearTimeout(timer);
                            });
                            _this._postMessage(nativeApiRequest);
                        }),
                    ];
                });
            });
        };
        ZoomSdk.prototype.config = function (options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (options.capabilities) {
                        options.js_api_lists = __spreadArrays(
                            options.capabilities
                        );
                        delete options.capabilities;
                    }
                    if (
                        !options.js_api_lists ||
                        (options.js_api_lists &&
                            !Array.isArray(options.js_api_lists))
                    ) {
                        options.js_api_lists = [];
                    }
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.CONFIG, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getSupportedJsApis = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.GET_SUPPORTED_JS_APIS,
                            null,
                            null,
                            function (data) {
                                return isString(data) ? JSON.parse(data) : data;
                            }
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.openUrl = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    new URL(options.url); // throw TypeError if invalid
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.OPEN_URL, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getRunningContext = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.GET_RUNNING_CONTEXT),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getMeetingContext = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.GET_MEETING_CONTEXT,
                            null,
                            null,
                            function (data) {
                                return isString(data) ? JSON.parse(data) : data;
                            }
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.setVirtualBackground = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (options.blur) {
                                return [
                                    2 /*return*/,
                                    this.callZoomApi(
                                        NativeApis.SET_VIRTUAL_BACKGROUND,
                                        { blur: true },
                                        Timeouts.SET_VIRTUAL_BACKGROUND
                                    ),
                                ];
                            }
                            if (!options.fileUrl) return [3 /*break*/, 2];
                            new URL(options.fileUrl); // throw TypeError if invalid
                            return [4 /*yield*/, getImageData(options.fileUrl)];
                        case 1:
                            params = _a.sent();
                            return [
                                2 /*return*/,
                                this.callZoomApi(
                                    NativeApis.SET_VIRTUAL_BACKGROUND,
                                    params,
                                    Timeouts.SET_VIRTUAL_BACKGROUND
                                ),
                            ];
                        case 2:
                            if (options.imageData) {
                                return [
                                    2 /*return*/,
                                    this.callZoomApi(
                                        NativeApis.SET_VIRTUAL_BACKGROUND,
                                        options.imageData,
                                        Timeouts.SET_VIRTUAL_BACKGROUND
                                    ),
                                ];
                            }
                            throw new Error(
                                'setVirtualBackground() parameter fileUrl or imageData is required if blur is not true'
                            );
                    }
                });
            });
        };
        ZoomSdk.prototype.removeVirtualBackground = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.REMOVE_VIRTUAL_BACKGROUND),
                    ];
                });
            });
        };
        ZoomSdk.prototype.setVirtualForeground = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.SET_VIRTUAL_FOREGROUND,
                            options
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.removeVirtualForeground = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.REMOVE_VIRTUAL_FOREGROUND),
                    ];
                });
            });
        };
        ZoomSdk.prototype.showNotification = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.SHOW_NOTIFICATION, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.cloudRecording = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.CLOUD_RECORDING, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.shareApp = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.SHARE_APP, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.listCameras = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.LIST_CAMERAS),
                    ];
                });
            });
        };
        ZoomSdk.prototype.setCamera = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.SET_CAMERA, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.setVideoMirrorEffect = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.SET_VIDEO_MIRROR_EFFECT,
                            options
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getMeetingParticipants = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.GET_MEETING_PARTICIPANTS),
                    ];
                });
            });
        };
        ZoomSdk.prototype.sendAppInvitation = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.SEND_APP_INVITATION,
                            options
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getUserContext = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.GET_USER_CONTEXT),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getRecordingContext = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.GET_RECORDING_CONTEXT),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getMeetingJoinUrl = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.GET_MEETING_JOIN_URL),
                    ];
                });
            });
        };
        ZoomSdk.prototype.getMeetingUUID = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.GET_MEETING_UUID),
                    ];
                });
            });
        };
        ZoomSdk.prototype.expandApp = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.EXPAND_APP, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.callZoomApi(NativeApis.CONNECT)];
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        ZoomSdk.prototype.postMessage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.POST_MESSAGE, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.allowParticipantToRecord = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.ALLOW_PARTICIPANT_TO_RECORD,
                            options
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.launchAppInMeeting = function (options) {
            if (options === void 0) {
                options = {};
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.LAUNCH_APP_IN_MEETING,
                            options
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.showAppInvitationDialog = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.SHOW_APP_INVITATION_DIALOG),
                    ];
                });
            });
        };
        ZoomSdk.prototype.sendAppInvitationToMeetingOwner = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.SEND_APP_INVITATION_TO_MEETING_OWNER
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.sendAppInvitationToAllParticipants = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.SEND_APP_INVITATION_TO_ALL_PARTICIPANTS
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.endSyncData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.END_SYNC_DATA),
                    ];
                });
            });
        };
        ZoomSdk.prototype.runRenderingContext = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(
                            NativeApis.RUN_RENDERING_CONTEXT,
                            options
                        ),
                    ];
                });
            });
        };
        ZoomSdk.prototype.closeRenderingContext = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.CLOSE_RENDERING_CONTEXT),
                    ];
                });
            });
        };
        ZoomSdk.prototype.drawParticipant = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (options.x) {
                        options.x = getDevicePixelsForValue(
                            options.x,
                            window.innerWidth
                        );
                    }
                    if (options.y) {
                        options.y = getDevicePixelsForValue(
                            options.y,
                            window.innerHeight
                        );
                    }
                    if (options.width) {
                        options.width = getDevicePixelsForValue(
                            options.width,
                            window.innerWidth
                        );
                    }
                    if (options.height) {
                        options.height = getDevicePixelsForValue(
                            options.height,
                            window.innerHeight
                        );
                    }
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.DRAW_PARTICIPANT, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.drawImage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (options.x) {
                        options.x = getDevicePixelsForValue(
                            options.x,
                            window.innerWidth
                        );
                    }
                    if (options.y) {
                        options.y = getDevicePixelsForValue(
                            options.y,
                            window.innerHeight
                        );
                    }
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.DRAW_IMAGE, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.clearParticipant = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.CLEAR_PARTICIPANT, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.clearImage = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        this.callZoomApi(NativeApis.CLEAR_IMAGE, options),
                    ];
                });
            });
        };
        ZoomSdk.prototype.onShareApp = function (handler) {
            this.addEventListener(NativeEvents.ON_SHARE_APP, handler);
        };
        ZoomSdk.prototype.onSendAppInvitation = function (handler) {
            this.addEventListener(NativeEvents.ON_SEND_APP_INVITATION, handler);
        };
        ZoomSdk.prototype.onCloudRecording = function (handler) {
            this.addEventListener(NativeEvents.ON_CLOUD_RECORDING, handler);
        };
        ZoomSdk.prototype.onReaction = function (handler) {
            this.addEventListener(NativeEvents.ON_REACTION, handler);
        };
        ZoomSdk.prototype.onParticipantChange = function (handler) {
            this.addEventListener(NativeEvents.ON_PARTICIPANT_CHANGE, handler);
        };
        ZoomSdk.prototype.onActiveSpeakerChange = function (handler) {
            this.addEventListener(
                NativeEvents.ON_ACTIVE_SPEAKER_CHANGE,
                handler
            );
        };
        ZoomSdk.prototype.onAppPopout = function (handler) {
            this.addEventListener(NativeEvents.ON_APP_POPOUT, handler);
        };
        ZoomSdk.prototype.onCohostChange = function (handler) {
            this.addEventListener(NativeEvents.ON_COHOST_CHANGE, handler);
        };
        ZoomSdk.prototype.onExpandApp = function (handler) {
            this.addEventListener(NativeEvents.ON_EXPAND_APP, handler);
        };
        ZoomSdk.prototype.onConnect = function (handler) {
            this.addEventListener(NativeEvents.ON_CONNECT, handler);
        };
        ZoomSdk.prototype.onMessage = function (handler) {
            this.addEventListener(NativeEvents.ON_MESSAGE, handler);
        };
        ZoomSdk.prototype.onMeeting = function (handler) {
            this.addEventListener(NativeEvents.ON_MEETING, handler);
        };
        // public onBreakoutRoomChange(handler: NativeEventHandler): void {
        //   this.addEventListener(NativeEvents.ON_BREAKOUT_ROOM_CHANGE, handler)
        // }
        ZoomSdk.prototype.onMyReaction = function (handler) {
            this.addEventListener(NativeEvents.ON_MY_REACTION, handler);
        };
        ZoomSdk.prototype.onMyActiveSpeakerChange = function (handler) {
            this.addEventListener(
                NativeEvents.ON_MY_ACTIVE_SPEAKER_CHANGE,
                handler
            );
        };
        ZoomSdk.prototype.onMyUserContextChange = function (handler) {
            this.addEventListener(
                NativeEvents.ON_MY_USER_CONTEXT_CHANGE,
                handler
            );
        };
        ZoomSdk.prototype.onMyMediaChange = function (handler) {
            this.addEventListener(NativeEvents.ON_MY_MEDIA_CHANGE, handler);
        };
        ZoomSdk.prototype.addEventListener = function (event, handler) {
            nativeEventHandlers[event]
                ? nativeEventHandlers[event].push(handler)
                : (nativeEventHandlers[event] = [handler]);
        };
        ZoomSdk.prototype.removeEventListener = function (event, handler) {
            if (!nativeEventHandlers[event]) return;
            nativeEventHandlers[event] = nativeEventHandlers[event].filter(
                function (fn) {
                    return fn !== handler;
                }
            );
        };
        return ZoomSdk;
    })();
    function getJsCallId() {
        return 'id' + Math.random().toString(16).slice(2);
    }
    function setNativeApiCallback(jsCallId, callback) {
        nativeApiCallbacks[jsCallId] = callback;
    }
    function removeNativeApiCallback(jsCallId) {
        if (nativeApiCallbacks[jsCallId]) delete nativeApiCallbacks[jsCallId];
    }
    function isString(v) {
        return typeof v === 'string';
    }
    var FIXED_WIDTH = 1280;
    function getImageData(fileUrl) {
        return new Promise(function (resolve) {
            var canvas = document.createElement('canvas');
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var height = (FIXED_WIDTH * img.height) / img.width;
                canvas.width = FIXED_WIDTH;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, FIXED_WIDTH, height);
                var imageData = ctx.getImageData(0, 0, FIXED_WIDTH, height);
                resolve(imageData);
            };
            img.src = fileUrl;
        });
    }
    function getDevicePixelsForValue(pixelValue, containerSize) {
        if (isString(pixelValue)) {
            var value = parseFloat(pixelValue);
            if (pixelValue.endsWith('px')) {
                return Math.trunc(value * window.devicePixelRatio);
            } else if (pixelValue.endsWith('%')) {
                return Math.trunc(
                    (value / 100.0) * containerSize * window.devicePixelRatio
                );
            }
        }
        return pixelValue;
    }

    /* Portions of the code are covered by the following license */
    /*
  MIT LICENSE
  Copyright 2011 Jon Leighton
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
    var encodings =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    function base64ArrayBuffer(arrayBuffer) {
        var bytes = new Uint8Array(arrayBuffer);
        var byteLength = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength = byteLength - byteRemainder;
        var base64 = '';
        var a, b, c, d;
        var chunk;
        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
            d = chunk & 63; // 63       = 2^6 - 1
            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }
        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];
            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4; // 3   = 2^2 - 1
            base64 += encodings[a] + encodings[b] + '==';
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2; // 15    = 2^4 - 1
            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }
        return base64;
    }

    function serialize(message) {
        return JSON.stringify(message, function (key, value) {
            if (
                (value === null || value === void 0
                    ? void 0
                    : value.constructor) === ImageData
            ) {
                return serializeImageData(value);
            }
            return value;
        });
    }
    function serializeImageData(imageData) {
        return {
            width: imageData.width,
            height: imageData.height,
            bitmap:
                'data:object/Uint8ClampedArray;base64,' +
                base64ArrayBuffer(imageData.data),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function detectBrowser(window) {
        var _a, _b, _c;
        if (window.android) {
            return {
                type: 'android',
                nativeInterface: window.android,
            };
        } else if (
            (_a = window.chrome) === null || _a === void 0 ? void 0 : _a.webview
        ) {
            return {
                type: 'chrome',
                nativeInterface: window.chrome.webview,
            };
        } else if (
            (_c =
                (_b = window.webkit) === null || _b === void 0
                    ? void 0
                    : _b.messageHandlers) === null || _c === void 0
                ? void 0
                : _c.jsOCHelper
        ) {
            return {
                type: 'webkit',
                nativeInterface: window.webkit.messageHandlers.jsOCHelper,
            };
        }
    }

    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function createSdk(win) {
        win = win || window;
        var browser = detectBrowser(win);
        if (!browser) {
            console.warn('The Zoom Apps SDK is not supported by this browser');
            return;
        }
        var zoomSdk = new ZoomSdk({
            postMessage: function (message) {
                try {
                    var json = serialize(message);
                    browser.nativeInterface.postMessage(json);
                } catch (error) {
                    console.error('Failed to serialize NativeApiRequest');
                }
            },
            version: version,
        });
        if (browser.type === 'chrome') {
            // In Webview2, callbacks are events
            browser.nativeInterface.addEventListener(
                'message',
                zoomSdk.native2js
            );
        }
        return zoomSdk;
    }

    var index = createSdk();

    return index;
})();
