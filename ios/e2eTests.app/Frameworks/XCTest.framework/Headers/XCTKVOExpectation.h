//
//  Copyright (c) 2016 Apple Inc. All rights reserved.
//

#import <XCTest/XCTestDefines.h>
#import <XCTest/XCTestExpectation.h>
#import <XCTest/XCTestCase+AsynchronousTesting.h>

NS_ASSUME_NONNULL_BEGIN

/*!
 * @class XCTKVOExpectation
 * Expectation subclass for waiting on a condition defined Key Value Observation of a key path for an object.
 */
@interface XCTKVOExpectation : XCTestExpectation {
#ifndef __OBJC2__
@private
    id _internal;
#endif
}

- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithDescription:(NSString *)expectationDescription NS_UNAVAILABLE;

/*!
 * @method -initWithKeyPath:object:expectedValue:options:
 *
 * @discussion
 * Initializes an expectation that is fulfilled when a key value coding compliant change is made such
 * that the specified key path of the observed object has the expected value.
 */
- (instancetype)initWithKeyPath:(NSString *)keyPath object:(id)object expectedValue:(nullable id)expectedValue options:(NSKeyValueObservingOptions)options NS_DESIGNATED_INITIALIZER;

/*!
 * @method -initWithKeyPath:object:expectedValue:
 *
 * @discussion
 * Initializes an expectation that is fulfilled when a key value coding compliant change is made such
 * that the specified key path of the observed object has the expected value. The NSKeyValueObservingOptions
 * passed for this initializer include NSKeyValueObservingOptionInitial, so the object/key path will be
 * checked immediately. The options also include NSKeyValueObservingOptionNew and NSKeyValueObservingOptionOld,
 * so if a handler is used the change dictionary passed to it will contain NSKeyValueChangeNewKey and
 * NSKeyValueChangeOldKey entries.
 */
- (instancetype)initWithKeyPath:(NSString *)keyPath object:(id)object expectedValue:(nullable id)expectedValue;

/*!
 * @method -initWithKeyPath:object:
 *
 * @discussion
 * Convenience initializer that is fulfilled by any change to the specified key path of the observed object.
 * The NSKeyValueObservingOptions passed for this initializer do not include NSKeyValueObservingOptionInitial
 * since there is no value to check. If that behavior is desired in conjunction with a handler, use the
 * designated initializer. The options do include NSKeyValueObservingOptionNew and NSKeyValueObservingOptionOld,
 * so if a handler is used the change dictionary passed to it will contain NSKeyValueChangeNewKey and
 * NSKeyValueChangeOldKey entries.
 */
- (instancetype)initWithKeyPath:(NSString *)keyPath object:(id)object;

/*!
 * @property keyPath
 * Returns the key path that is being monitored for the KVO change.
 */
@property (readonly, copy) NSString *keyPath;

/*!
 * @property observedObject
 * Returns the object that is being monitored for the KVO change.
 */
@property (readonly, strong) id observedObject;

/*!
 * @property expectedValue
 * Returns the value that the expectation is waiting for the observed object/key path to have.
 */
@property (nullable, readonly, strong) id expectedValue;

/*!
 * @property options
 * The KVO options used when the expectation registered for observation. 
 */
@property (readonly) NSKeyValueObservingOptions options;

/*!
 * @property handler
 * Allows the caller to install a special handler to do custom evaluation of the change to the value
 * of the object/key path. If a handler is set, expectedValue will be ignored.
 */
@property (nullable, copy) XCKeyValueObservingExpectationHandler handler;

@end

NS_ASSUME_NONNULL_END
