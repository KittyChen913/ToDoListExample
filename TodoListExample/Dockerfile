# the build stage uses the SDK image:
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as builder  
WORKDIR /app
ADD / .
RUN dotnet publish \
  -c Release \
  -o ./output

# the final app uses the runtime image:
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1  
WORKDIR /app
COPY --from=builder /app/output .
ENTRYPOINT ["dotnet", "TodoListExample.dll"]  