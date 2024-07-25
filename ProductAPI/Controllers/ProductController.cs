using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Domain.Entities;
using ProductAPI.DTOs;
using ProductAPI.Services;
using System;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            try
            {
                var products = await _productService.GetAllProducts();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreateProduct")]
        public async Task<ActionResult> Create([FromBody] ProductDto productDto)
        {
            try
            {
                var product = new Product
                {
                    Name = productDto.Name,
                    Price = productDto.Price,
                };
                await _productService.AddProduct(product);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateProduct/{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ProductDto productDto)
        {
            try
            {
                var product = await _productService.GetProductById(id);
                if (product == null)
                {
                    return NotFound();
                }

                product.Name = productDto.Name;
                product.Price = productDto.Price;
                await _productService.UpdateProduct(product);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var product = await _productService.GetProductById(id);
                if (product == null)
                {
                    return NotFound();
                }

                await _productService.DeleteProduct(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
