using Microsoft.AspNetCore.Mvc;
using ProductAPI.Controllers;
using ProductAPI.Domain.Entities;
using ProductAPI.DTOs;
using ProductAPI.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Moq;

namespace ProductAPI.Tests
{
    public class ProductControllerTests
    {
        private readonly Mock<IProductService> _mockProductService;
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            _mockProductService = new Mock<IProductService>();
            _controller = new ProductController(_mockProductService.Object);
        }

        // Test GetAllProducts
        [Fact]
        public async Task GetAll_ReturnsOkResult_WithListOfProducts()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Product1", Price = 10.0M },
                new Product { Id = 2, Name = "Product2", Price = 20.0M }
            };
            _mockProductService.Setup(s => s.GetAllProducts()).ReturnsAsync(products);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Product>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<Product>>(okResult.Value);

            Assert.Equal(products.Count, returnValue.Count);
        }

        [Fact]
        public async Task GetAll_ReturnsBadRequest_OnException()
        {
            // Arrange
            _mockProductService.Setup(s => s.GetAllProducts()).ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.GetAll();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Product>>>(result);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        // Test CreateProduct
        [Fact]
        public async Task Create_ReturnsOkResult_OnSuccess()
        {
            // Arrange
            var productDto = new ProductDto { Name = "Product1", Price = 10.0M };
            _mockProductService.Setup(s => s.AddProduct(It.IsAny<Product>())).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Create(productDto);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_OnException()
        {
            // Arrange
            var productDto = new ProductDto { Name = "Product1", Price = 10.0M };
            _mockProductService.Setup(s => s.AddProduct(It.IsAny<Product>())).ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.Create(productDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        // Test UpdateProduct
        [Fact]
        public async Task Update_ReturnsOkResult_OnSuccess()
        {
            // Arrange
            var productDto = new ProductDto { Name = "UpdatedProduct", Price = 15.0M };
            var product = new Product { Id = 1, Name = "OldProduct", Price = 10.0M };
            _mockProductService.Setup(s => s.GetProductById(1)).ReturnsAsync(product);
            _mockProductService.Setup(s => s.UpdateProduct(It.IsAny<Product>())).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Update(1, productDto);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFound_WhenProductDoesNotExist()
        {
            // Arrange
            var productDto = new ProductDto { Name = "UpdatedProduct", Price = 15.0m };
            _mockProductService.Setup(s => s.GetProductById(1)).ReturnsAsync((Product)null);

            // Act
            var result = await _controller.Update(1, productDto);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsBadRequest_OnException()
        {
            // Arrange
            var productDto = new ProductDto { Name = "UpdatedProduct", Price = 15.0m };
            _mockProductService.Setup(s => s.GetProductById(1)).ReturnsAsync(new Product { Id = 1, Name = "OldProduct", Price = 10.0M });
            _mockProductService.Setup(s => s.UpdateProduct(It.IsAny<Product>())).ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.Update(1, productDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        // Test DeleteProduct
        [Fact]
        public async Task DeleteProduct_ReturnsOkResult_OnSuccess()
        {
            // Arrange
            _mockProductService.Setup(s => s.GetProductById(1)).ReturnsAsync(new Product { Id = 1, Name = "Product", Price = 10.0M });
            _mockProductService.Setup(s => s.DeleteProduct(1)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteProduct(1);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task DeleteProduct_ReturnsNotFound_WhenProductDoesNotExist()
        {
            // Arrange
            _mockProductService.Setup(s => s.GetProductById(1)).ReturnsAsync((Product)null);

            // Act
            var result = await _controller.DeleteProduct(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteProduct_ReturnsBadRequest_OnException()
        {
            // Arrange
            _mockProductService.Setup(s => s.GetProductById(1)).ReturnsAsync(new Product { Id = 1, Name = "Product", Price = 10.0M });
            _mockProductService.Setup(s => s.DeleteProduct(1)).ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.DeleteProduct(1);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }
    }
}
