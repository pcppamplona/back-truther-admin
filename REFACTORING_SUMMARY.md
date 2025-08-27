# Refactoring Summary: Database Mapping Layer

## Overview

This refactoring focused on extracting the database mapping logic from the repository classes into dedicated mapper classes. The goal was to improve code organization, maintainability, and reusability by separating concerns.

## Changes Made

1. Created a new `mappers` directory under `src/infra/db` to house all mapper classes
2. Created the following mapper classes:
   - `UserMapper`: Maps database rows to `UserTrutherWithWallet` objects
   - `WalletMapper`: Maps database rows to `Wallet` objects
   - `UserInfoMapper`: Maps database rows to `UserInfo` objects
   - `UserImageMapper`: Maps database rows to `UserImage` objects
   - `KycUserMapper`: Maps database rows to `KycUser` objects
   - `CustomerMapper`: Maps database rows to `Customer` objects
3. Refactored the `findDetailedUserInfoById` method in `PgUserTrutherRepository` to use these mapper classes
4. Refactored the `findPaginatedWithWallets` method in `PgUserTrutherRepository` to use these mapper classes

## Benefits

### 1. Separation of Concerns
The repository classes now focus on data access (querying the database), while the mapper classes handle data transformation (converting database rows to domain objects). This makes the code easier to understand and maintain.

### 2. Code Reusability
The mapping logic is now centralized in dedicated classes, making it easier to reuse across different parts of the application. For example, both `findDetailedUserInfoById` and `findPaginatedWithWallets` now use the same `UserMapper` and `WalletMapper` classes.

### 3. Improved Maintainability
Changes to the mapping logic can now be made in a single place, rather than having to update multiple repository methods. This reduces the risk of inconsistencies and makes the codebase more maintainable.

### 4. Better Testability
The mapper classes can be tested in isolation, making it easier to verify that they correctly transform database rows to domain objects.

### 5. Cleaner Repository Code
The repository methods are now shorter and more focused on their primary responsibility of data access, making them easier to understand and maintain.

## Future Improvements

1. Add unit tests for the mapper classes to ensure they correctly transform database rows to domain objects
2. Consider adding more specialized mapping methods to handle specific use cases
3. Explore using a more generic mapping approach to reduce duplication across mapper classes