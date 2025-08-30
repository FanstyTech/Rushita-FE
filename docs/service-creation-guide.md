# Service Creation Guide

This guide outlines the steps and best practices for creating new services in the Rousheta Backend project.

## Project Structure

```
Rousheta.Domain/
  └── Entities/
      └── {ModuleName}/                   # e.g., Clinics/
          └── Entity.cs                   # e.g., Clinic.cs

Rousheta.Application/
  ├── DTOs/
  │   └── {ModuleName}/                   # e.g., Clinics/
  │       ├── EntityDto.cs                # Full entity DTO
  │       ├── CreateUpdateEntityDto.cs    # Creation and Update DTO
  │       ├── EntityListDto.cs            # List view DTO
  │       └── EntityFilterDto.cs          # Filter DTO for queries
  ├── Interfaces/
  │   └── {ModuleName}/                   # e.g., Clinics/
  │       └── IEntityAppService.cs        # e.g., IClinicAppService.cs
  └── Mappings/
      └── MappingProfile.cs               # AutoMapper profile

Rousheta.Infrastructure/
  └── {ModuleName}/                       # e.g., Clinics/
      └── EntityAppService.cs             # e.g., ClinicAppService.cs
```

## Entity Creation

1. Create entity class in `Rousheta.Domain/Entities/{ModuleName}/`:

```csharp
public class Entity : BaseEntity<Guid>
{
    public string NameL { get; set; }
    public string NameF { get; set; }

    // Navigation properties
    public Guid? ParentEntityId { get; set; }
    public virtual ParentEntity ParentEntityFk { get; set; }

    // Collections
    public virtual ICollection<ChildEntity> ChildEntities { get; set; }
}
```

2. Add DbSet to `ApplicationDbContext`:

```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<Entity> Entities { get; set; }
}
```

## Step 1: Create DTOs

1. Create DTOs in `Rousheta.Application/DTOs/{ModuleName}/`:

```csharp
public class EntityDto
{
    public Guid Id { get; set; }
    public string NameL { get; set; }
    public string NameF { get; set; }
    public string Name { get; set; }
    // ... other properties
}

public class CreateUpdateEntityDto
{
    public Guid? Id { get; set; } // Optional, empty for create
    public string NameL { get; set; }
    public string NameF { get; set; }
    // ... properties for both create and update
}


public class EntityListDto
{
    public Guid Id { get; set; }
    public string NameL { get; set; }
    public string NameF { get; set; }
    public string Name { get; set; }
    // ... properties for list view
}

public class EntityFilterDto : PaginationRequest
{
    public string NameL { get; set; }
    public string NameF { get; set; }
    public bool? IsActive { get; set; }
    // ... additional filter properties
}
```

## Step 2: Create Interface

1. Create interface in `Rousheta.Application/Interfaces/{ModuleName}/`:

```csharp
public interface IEntityAppService
{
    Task<PaginationModel<EntityListDto>> GetAll(EntityFilterDto filter);
    Task<EntityDto> GetById(Guid id);
    Task<EntityDto> CreateOrUpdate(CreateUpdateEntityDto input);
    Task Delete(Guid id);
}
```

## Step 3: Create Service Implementation

1. Create service class in `Rousheta.Infrastructure/{ModuleName}/`:

```csharp
public class EntityAppService : AppServiceBase, IEntityAppService
{
    private readonly IRepository<Entity, Guid> _repository;

    public EntityAppService(IRepository<Entity, Guid> repository)
    {
        _repository = repository;
    }

    public async Task<PaginationModel<EntityListDto>> GetAll(EntityFilterDto filter)
    {
        var query = _repository.Query().AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(filter.SearchValue))
        {
            query = query.ApplyFilter(filter.SearchValue,
                x => x.NameL,
                x => x.NameF);
        }

        var result = await query.ToPaginatedListAsync(filter);
        return CreatePaginatedResult<Entity, EntityListDto>(result);
    }

    public async Task<EntityDto> GetById(BaseDto<Guid> input)
    {
        var entity = await _repository.GetByIdAsync(input.Id);
        if (entity == null)
            throw new Exception(L("EntityNotFound", nameof(Entity), input.Id));

        return MapTo<EntityDto>(entity);
    }

    public async Task<EntityDto> CreateOrUpdate(CreateUpdateEntityDto input)
    {
        return input.Id.HasValue
            ? await Update(input)
            : await Create(input);
    }

    private async Task<EntityDto> Create(CreateUpdateEntityDto input)
    {
        var entity = MapTo<Entity>(input);
        await _repository.AddAsync(entity);

        return MapTo<EntityDto>(entity);
    }

    private async Task<EntityDto> Update(CreateUpdateEntityDto input)
    {
        var entity = await _repository.GetByIdAsync(input.Id.Value);
        if (entity == null)
            throw new Exception(L("EntityNotFound", nameof(Entity), input.Id));

        MapTo(input, entity);
        await _repository.UpdateAsync(entity);

        return MapTo<EntityDto>(entity);s
    }

    public async Task Delete(BaseDto<Guid> input)
    {
        var entity = await _repository.GetByIdAsync(input.Id);
        if (entity == null)
            throw new Exception(L("EntityNotFound", nameof(Entity), input.Id));

        await _repository.DeleteAsync(entity);
    }
}
```

Key points:

1. Inherit from `AppServiceBase` to get access to common functionality
2. Use `IRepository<T, TKey>` for data access instead of `ApplicationDbContext`
3. Use `WhereIf` extension method for clean conditional filtering
4. Use `ToPaginatedListAsync` extension method for pagination
5. Use the inherited `Mapper` property from `AppServiceBase` for object mapping
6. Use `L()` method for localized exception messages
7. Create entity-specific filter DTO that inherits from `PaginationRequest`

## Step 4: Add AutoMapper Configuration

1. In `Rousheta.Application/Mappings/MappingProfile.cs`, register mappings:

```csharp
CreateMap<Entity, EntityDto>();
CreateMap<Entity, EntityListDto>();
CreateMap<CreateUpdateEntityDto, Entity>()
    .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
```

## Localization

1. Add localization keys in the appropriate language files:

```json
{
  "EntityNotFound": "{0} with id {1} not found"
}
```

## Best Practices

1. **Naming Conventions**:

   - Services end with `AppService`
   - Interfaces start with `I` and end with `AppService`
   - DTOs end with `Dto`
   - List DTOs end with `ListDto`

2. **Service Implementation**:

   - Inherit from `AppServiceBase`
   - Use repository pattern with `IRepository<TEntity, TKey>`
   - Use mapping methods from `AppServiceBase`

3. **Repository Usage**:

   - Use `Query()` for queries
   - Use `GetByIdAsync()` for single items
   - Use `AddAsync()` for creation
   - Use `UpdateAsync()` for updates
   - Use `DeleteAsync()` for deletion
   - Use `ExistsAsync()` for existence checks

4. **Pagination and Filtering**:

   - Use `PaginationRequest` for pagination
   - Use `ApplyFilter()` for search filtering
   - Use `ToPaginatedListAsync()` for paginated results
   - Use `CreatePaginatedResult<TEntity, TDto>()` for mapping

5. **Error Handling**:

   - Throw `NotFoundException` when entity not found
   - Use proper exception handling for business rules

6. **Includes and Navigation**:

   - Add necessary `.Include()` statements for related entities
   - Keep includes minimal to what's needed

## Example Usage

```csharp
// Creating a new clinic service
public interface IClinicAppService : IEntityAppService
{
    // Add any clinic-specific methods here
}

public class ClinicAppService : AppServiceBase, IClinicAppService
{
    private readonly IRepository<Clinic, Guid> _repository;

    public ClinicAppService(IRepository<Clinic, Guid> repository)
    {
        _repository = repository;
    }

    // Implement interface methods...
}
```

## Notes

1. All services are automatically registered and endpoints are generated
2. Use dependency injection for repositories and other services
3. Keep services focused on business logic
4. Use DTOs for data transfer, never expose entities directly
5. Follow consistent naming and implementation patterns
6. Place interfaces in Application layer and implementations in Infrastructure layer
7. Use proper module organization for better maintainability
8. Dont using [required] attribute in dto classes
9. Set all enttity dtos in one dto file
